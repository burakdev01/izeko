<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\RegionalManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RegionalManagerController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $managers = RegionalManager::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (RegionalManager $manager) => $this->mapManager($manager));

        return Inertia::render('admin/regional-managers/index', [
            'managers' => $managers,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/regional-managers/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateManager($request);
        $validated['active'] = $request->boolean('active');
        $validated['sort_order'] = (RegionalManager::max('sort_order') ?? 0) + 1;

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'regional_managers',
            'uploads',
        );

        if ($image) {
            $validated['image'] = $image;
        }

        RegionalManager::create($validated);

        return redirect()
            ->route('admin.regional-managers.index')
            ->with('status', 'Bölge sorumlusu eklendi.');
    }

    public function edit(RegionalManager $regionalManager)
    {
        return Inertia::render('admin/regional-managers/edit', [
            'manager' => $this->mapManager($regionalManager),
        ]);
    }

    public function update(Request $request, RegionalManager $regionalManager)
    {
        $validated = $this->validateManager($request, $regionalManager);
        $validated['active'] = $request->boolean('active');

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'regional_managers',
            'uploads',
        );

        if ($image) {
            if ($regionalManager->image) {
                Storage::disk('uploads')->delete('regional_managers/' . $regionalManager->image);
            }
            $validated['image'] = $image;
        } elseif (! $request->filled('image')) {
            $validated['image'] = $regionalManager->image;
        }

        $regionalManager->update($validated);

        return redirect()
            ->route('admin.regional-managers.index')
            ->with('status', "Bölge sorumlusu güncellendi.");
    }

    public function destroy(RegionalManager $regionalManager)
    {
        if ($regionalManager->image) {
            Storage::disk('uploads')->delete('regional_managers/' . $regionalManager->image);
        }

        $regionalManager->delete();

        return redirect()
            ->route('admin.regional-managers.index')
            ->with('status', 'Bölge sorumlusu silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:regional_managers,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            RegionalManager::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.regional-managers.index')
            ->with('status', "Sıralama güncellendi.");
    }

    private function validateManager(Request $request, ?RegionalManager $manager = null): array
    {
        $imageRules = ['nullable', 'string', 'max:255'];

        // If we want image to be required, we can uncomment this. 
        // Currently it's optional as per plan.
        // if (! $manager || ! $manager->image) {
        //     $imageRules[] = 'required_without:image_file';
        // }

        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'image' => $imageRules,
            'image_file' => ['nullable', 'image', 'max:5120'],
            'active' => ['nullable', 'boolean'],
        ]);
    }

    private function mapManager(RegionalManager $manager): array
    {
        return [
            'id' => $manager->id,
            'name' => $manager->name,
            'title' => $manager->title,
            'phone' => $manager->phone,
            'email' => $manager->email,
            'image' => $manager->image ? (
                str_starts_with($manager->image, 'http')
                    ? $manager->image
                    : config('filesystems.disks.uploads.url') . '/regional_managers/' . $manager->image
            ) : null,
            'active' => $manager->active,
            'sort_order' => $manager->sort_order,
        ];
    }
}
