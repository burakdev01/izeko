<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    use HandlesUploads;
    public function index()
    {
        $activities = Activity::orderByDesc('date')
            ->get()
            ->map(fn (Activity $activity) => $this->mapActivity($activity));

        return Inertia::render('admin/activities/index', [
            'activities' => $activities,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/activities/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateActivity($request);

        $thumbnail = $this->storePublicFile(
            $request,
            'thumbnail_file',
            'activities',
        );

        if ($thumbnail) {
            $validated['thumbnail'] = $thumbnail;
        }

        Activity::create($validated);

        return redirect()
            ->route('admin.activities.index')
            ->with('status', 'Faaliyet eklendi.');
    }

    public function edit(Activity $activity)
    {
        return Inertia::render('admin/activities/edit', [
            'activity' => $this->mapActivity($activity),
        ]);
    }

    public function update(Request $request, Activity $activity)
    {
        $validated = $this->validateActivity($request, $activity);

        $thumbnail = $this->storePublicFile(
            $request,
            'thumbnail_file',
            'activities',
        );

        if ($thumbnail) {
            $validated['thumbnail'] = $thumbnail;
        } elseif (! $request->filled('thumbnail')) {
            $validated['thumbnail'] = $activity->thumbnail;
        }

        $activity->update($validated);

        return redirect()
            ->route('admin.activities.index')
            ->with('status', 'Faaliyet guncellendi.');
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();

        return redirect()
            ->route('admin.activities.index')
            ->with('status', 'Faaliyet silindi.');
    }

    private function validateActivity(
        Request $request,
        ?Activity $activity = null,
    ): array {
        $thumbnailRules = ['nullable', 'url', 'max:255'];

        if (! $activity || ! $activity->thumbnail) {
            $thumbnailRules[] = 'required_without:thumbnail_file';
        }

        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'video_url' => ['required', 'url', 'max:255'],
            'thumbnail' => $thumbnailRules,
            'thumbnail_file' => ['nullable', 'image', 'max:5120'],
        ]);
    }

    private function mapActivity(Activity $activity): array
    {
        return [
            'id' => $activity->id,
            'title' => $activity->title,
            'date' => optional($activity->date)->format('Y-m-d'),
            'video_url' => $activity->video_url,
            'thumbnail' => $activity->thumbnail,
        ];
    }
}
