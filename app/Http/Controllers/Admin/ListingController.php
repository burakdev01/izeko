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

    public function edit(Listing $listing)
    {
        return Inertia::render('admin/listings/edit', [
            'listing' => $listing,
        ]);
    }

    public function update(Request $request, Listing $listing)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'office_id' => 'required|integer',
            'user_id' => 'required|integer|exists:users,id',
            'price' => 'required|numeric|min:0',
            'listing_status' => 'required|in:pending,active,inactive',
        ]);

        $listing->update($validated);

        return redirect()->route('admin.ilanlar.index')
            ->with('success', 'İlan başarıyla güncellendi.');
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