<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::orderByDesc('date')
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
        $validated = $this->validateAnnouncement($request);

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

    private function validateAnnouncement(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'excerpt' => ['required', 'string', 'max:1000'],
            'content' => ['required', 'string'],
            'image' => ['required', 'url', 'max:255'],
            'link' => ['nullable', 'string', 'max:255'],
            'date' => ['required', 'date'],
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
            'date' => optional($announcement->date)->format('Y-m-d'),
        ];
    }
}
