<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Listing;
use Inertia\Inertia;

class ListingController extends Controller
{
    public function index(Request $request)
    {
        $query = Listing::query();

        if ($request->has('status') && in_array($request->status, ['pending', 'active', 'inactive'])) {
            $query->where('listing_status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('id', 'like', "%{$search}%")
                  ->orWhere('office_id', 'like', "%{$search}%");
            });
        }

        $listings = $query->orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('admin/listings/index', [
            'listings' => $listings,
            'filters' => $request->only(['status', 'search']),
            'stats' => [
                'total' => Listing::count(),
                'active' => Listing::where('listing_status', 'active')->count(),
                'pending' => Listing::where('listing_status', 'pending')->count(),
            ],
        ]);
    }

    public function show(Listing $listing)
    {
        $listing->load([
            'category.parent', 
            'office', 
            'user', 
            'address.province', 
            'address.district', 
            'address.neighborhood',
            'attributes.attribute.group',
            'attributes.option'
        ]);

        $features = $listing->attributes->map(function ($listingAttr) {
            $attribute = $listingAttr->attribute;
            $value = null;

            if (!$attribute) return null;

            switch ($attribute->data_type) {
                case 'string':
                    $value = $listingAttr->value_string;
                    break;
                case 'number':
                    $value = $listingAttr->value_int . ($attribute->unit ? ' ' . $attribute->unit : '');
                    break;
                case 'boolean':
                    $value = $listingAttr->value_bool ? 'Evet' : 'Hayır';
                    break;
                case 'option':
                    $value = $listingAttr->option ? $listingAttr->option->value : null;
                    break;
            }

            if ($value === null) return null;

            return [
                'group' => $attribute->group ? $attribute->group->name : 'Genel Özellikler',
                'name' => $attribute->name,
                'value' => $value,
                'sort_order' => $attribute->group ? $attribute->group->sort_order : 9999, // Sort groups
            ];
        })->filter()->groupBy('group')->map(function ($items, $groupName) {
            return [
                'name' => $groupName,
                'items' => $items->values(),
                'sort_order' => $items->first()['sort_order'],
            ];
        })->sortBy('sort_order')->values();

        return Inertia::render('admin/listings/show', [
            'listing' => [
                'id' => $listing->id,
                'title' => $listing->title,
                'description' => $listing->description,
                'price' => $listing->price,
                'status' => $listing->listing_status,
                'main_photo' => $listing->main_photo_path 
                    ? config('app.url') . "/storage/listings/{$listing->id}/" . $listing->main_photo_path 
                    : null,
                'category' => $listing->category ? [
                    'id' => $listing->category->id,
                    'name' => $listing->category->name,
                    'hierarchy' => ($listing->category->parent ? $listing->category->parent->name . ' > ' : '') . $listing->category->name,
                ] : null,
                'office' => $listing->office ? [
                    'id' => $listing->office->id,
                    'name' => $listing->office->name,
                ] : null,
                'user' => $listing->user ? [
                    'id' => $listing->user->id,
                    'name' => $listing->user->name . ' ' . $listing->user->surname,
                ] : null,
                'location' => [
                    'city' => $listing->address?->province?->name ?? '',
                    'district' => $listing->address?->district?->name ?? '',
                    'neighborhood' => $listing->address?->neighborhood?->name ?? '',
                ],
                'created_at' => optional($listing->created_at)->format('d.m.Y') ?? '',
                'features' => $features,
            ],
        ]);
    }

    public function edit(Listing $listing)
    {
        return Inertia::render('admin/listings/edit', [
            'listing' => $listing,
        ]);
    }

    use \App\Http\Controllers\Concerns\HandlesUploads;

    public function update(Request $request, Listing $listing)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'office_id' => 'required|integer',
            'user_id' => 'required|integer|exists:users,id',
            'price' => 'required|numeric|min:0',
            'main_photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
            'photos' => 'nullable|array',
            'photos.*' => 'image|mimes:jpeg,png,jpg,webp|max:10240',
        ]);

        // Handle Main Photo Upload
        if ($request->hasFile('main_photo')) {
            $directory = "listings/{$listing->id}";
            $fileName = $this->storePublicImageNameAsWebp(
                $request,
                'main_photo',
                $directory
            );

            if ($fileName) {
                // Delete old photo if exists
                if ($listing->main_photo_path) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete("listings/{$listing->id}/{$listing->main_photo_path}");
                }
                // Save ONLY filename
                $validated['main_photo_path'] = $fileName;
            }
        }

        // Handle Gallery Photos Upload
        if ($request->hasFile('photos')) {
            $directory = "listings/{$listing->id}";
            foreach ($request->file('photos') as $photoFile) {
                try {
                    $image = \Intervention\Image\Laravel\Facades\Image::read($photoFile->getRealPath());
                    $encoded = $image->toWebp(80);
                    $baseName = pathinfo($photoFile->hashName(), PATHINFO_FILENAME);
                    $fileName = $baseName . '.webp';
                    $path = $directory . '/' . $fileName;
                    
                    \Illuminate\Support\Facades\Storage::disk('public')->put($path, (string) $encoded);
                    
                    // Create Photo Record - Save ONLY filename
                    $listing->photos()->create([
                        'photo_path' => $fileName,
                        'name' => $photoFile->getClientOriginalName(),
                        'photo_type' => 'gallery',
                        'sort' => 0,
                    ]);
                } catch (\Exception $e) {
                     \Illuminate\Support\Facades\Log::error('Gallery upload failed: ' . $e->getMessage());
                }
            }
        }

        $listing->update($validated);

        return redirect()->route('admin.ilanlar.index')
            ->with('success', 'İlan başarıyla güncellendi.');
    }

    public function updateStatus(Request $request, Listing $listing)
    {
        $validated = $request->validate([
            'status' => 'required|in:active,inactive,pending',
        ]);

        $listing->update(['listing_status' => $validated['status']]);

        return redirect()->back()
            ->with('success', 'İlan durumu güncellendi.');
    }

    public function destroy(Listing $listing)
    {
        $listing->delete();

        return redirect()->back()
            ->with('success', 'İlan başarıyla silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:listings,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            Listing::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.ilanlar.index')
            ->with('status', 'Sıralama güncellendi.');
    }
}