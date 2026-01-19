<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $announcements = Announcement::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (Announcement $announcement) => $this->mapAnnouncement($announcement));

        return Inertia::render('admin/duyurular/index', [
            'announcements' => $announcements,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/duyurular/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateAnnouncement($request);
        $validated['active'] = $request->boolean('active');
        $validated['sort_order'] = (Announcement::max('sort_order') ?? 0) + 1;
        $validated['excerpt'] = '';

        $image = $this->storePublicImageAsWebp(
            $request,
            'image_file',
            'announcements',
            'uploads',
        );

        if ($image) {
            $validated['image'] = $image;
        }

        Announcement::create($validated);

        return redirect()
            ->route('admin.duyurular.index')
            ->with('status', 'Duyuru eklendi.');
    }

    public function edit(Announcement $announcement)
    {
        return Inertia::render('admin/duyurular/edit', [
            'announcement' => $this->mapAnnouncement($announcement),
        ]);
    }

    public function update(Request $request, Announcement $announcement)
    {
        $validated = $this->validateAnnouncement($request, $announcement);
        $validated['active'] = $request->boolean('active');

        $image = $this->storePublicImageAsWebp(
            $request,
            'image_file',
            'announcements',
            'uploads',
        );

        if ($image) {
            $validated['image'] = $image;
        } elseif (! $request->filled('image')) {
            $validated['image'] = $announcement->image;
        }

        $announcement->update($validated);

        return redirect()
            ->route('admin.duyurular.index')
            ->with('status', "Duyuru g\u{00FC}ncellendi.");
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return redirect()
            ->route('admin.duyurular.index')
            ->with('status', 'Duyuru silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:announcements,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            Announcement::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.duyurular.index')
            ->with('status', "S\u{0131}ralama g\u{00FC}ncellendi.");
    }

    private function validateAnnouncement(
        Request $request,
        ?Announcement $announcement = null,
    ): array {
        $imageRules = ['nullable', 'url', 'max:255'];

        if (! $announcement || ! $announcement->image) {
            $imageRules[] = 'required_without:image_file';
        }

        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image' => $imageRules,
            'image_file' => ['nullable', 'image', 'max:5120'],
            'link' => ['nullable', 'url', 'max:255'],
            'active' => ['nullable', 'boolean'],
        ]);
    }

    private function mapAnnouncement(Announcement $announcement): array
    {
        return [
            'id' => $announcement->id,
            'title' => $announcement->title,
            'content' => $announcement->content,
            'image' => $announcement->image,
            'link' => $announcement->link,
            'date' => optional($announcement->updated_at)->format('Y-m-d'),
            'active' => $announcement->active,
            'sort_order' => $announcement->sort_order,
        ];
    }
}
