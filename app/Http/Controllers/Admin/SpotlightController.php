<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Spotlight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpotlightController extends Controller
{
    public function index()
    {
        $spotlights = Spotlight::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn($spotlight) => [
                'id' => $spotlight->id,
                'title' => $spotlight->title,
                'description' => $spotlight->description,
                'image' => $spotlight->image,
                'active' => $spotlight->active,
                'sort_order' => $spotlight->sort_order,
            ]);

        return Inertia::render('admin/spotlights/index', [
            'spotlights' => $spotlights,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/spotlights/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'required|image|max:2048', // Max 2MB
            'active' => 'boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:1000',
            'seo_keywords' => 'nullable|string|max:1000',
        ]);

        $path = $this->convertAndSaveWebp($request->file('image'));

        Spotlight::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'content' => $validated['content'],
            'image' => $path,
            'active' => $validated['active'] ?? true,
            'seo_title' => $validated['seo_title'] ?? null,
            'seo_description' => $validated['seo_description'] ?? null,
            'seo_keywords' => $validated['seo_keywords'] ?? null,
            'sort_order' => Spotlight::max('sort_order') + 1,
        ]);

        return redirect()->route('admin.spotlights.index')->with('success', 'Manşet başarıyla oluşturuldu.');
    }

    public function edit(Spotlight $spotlight)
    {
        return Inertia::render('admin/spotlights/edit', [
            'spotlight' => [
                'id' => $spotlight->id,
                'title' => $spotlight->title,
                'description' => $spotlight->description,
                'content' => $spotlight->content,
                'image' => $spotlight->image,
                'active' => $spotlight->active,
                'seo_title' => $spotlight->seo_title,
                'seo_description' => $spotlight->seo_description,
                'seo_keywords' => $spotlight->seo_keywords,
            ],
        ]);
    }

    public function update(Request $request, Spotlight $spotlight)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'active' => 'boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:1000',
            'seo_keywords' => 'nullable|string|max:1000',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($spotlight->image && file_exists(public_path($spotlight->image))) {
                unlink(public_path($spotlight->image));
            }

            $spotlight->image = $this->convertAndSaveWebp($request->file('image'));
        }

        $spotlight->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'content' => $validated['content'],
            'active' => $validated['active'] ?? $spotlight->active,
            'seo_title' => $validated['seo_title'] ?? null,
            'seo_description' => $validated['seo_description'] ?? null,
            'seo_keywords' => $validated['seo_keywords'] ?? null,
        ]);

        return redirect()->route('admin.spotlights.index')->with('success', 'Manşet başarıyla güncellendi.');
    }

    public function destroy(Spotlight $spotlight)
    {
        if ($spotlight->image && file_exists(public_path($spotlight->image))) {
            unlink(public_path($spotlight->image));
        }

        $spotlight->delete();

        return redirect()->back()->with('success', 'Manşet silindi.');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:spotlights,id',
            'items.*.sort_order' => 'required|integer',
        ]);

        foreach ($request->items as $item) {
            Spotlight::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return back()->with('success', 'Sıralama güncellendi.');
    }

    private function convertAndSaveWebp($file)
    {
        $filename = time() . '_' . pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '.webp';
        $directory = public_path('uploads/spotlights');

        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }

        $source = imagecreatefromstring(file_get_contents($file->getPathname()));
        
        // Handle transparency
        imagepalettetotruecolor($source);
        imagealphablending($source, true);
        imagesavealpha($source, true);
        
        imagewebp($source, $directory . '/' . $filename, 80); // 80 quality
        imagedestroy($source);

        return '/uploads/spotlights/' . $filename;
    }
}
