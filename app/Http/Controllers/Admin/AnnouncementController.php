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
        $announcements = Announcement::orderByDesc('updated_at')
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

        $image = $this->storePublicFile(
            $request,
            'image_file',
            'announcements',
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

        $image = $this->storePublicFile(
            $request,
            'image_file',
            'announcements',
        );

        if ($image) {
            $validated['image'] = $image;
        } elseif (! $request->filled('image')) {
            $validated['image'] = $announcement->image;
        }

        $announcement->update($validated);

        return redirect()
            ->route('admin.duyurular.index')
            ->with('status', 'Duyuru guncellendi.');
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return redirect()
            ->route('admin.duyurular.index')
            ->with('status', 'Duyuru silindi.');
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
            'subtitle' => ['nullable', 'string', 'max:255'],
            'excerpt' => ['required', 'string', 'max:1000'],
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
            'subtitle' => $announcement->subtitle,
            'excerpt' => $announcement->excerpt,
            'content' => $announcement->content,
            'image' => $announcement->image,
            'link' => $announcement->link,
            'date' => optional($announcement->updated_at)->format('Y-m-d'),
            'active' => $announcement->active,
        ];
    }
}
