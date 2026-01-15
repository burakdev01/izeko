<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
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
        $validated = $this->validateActivity($request);

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

    private function validateActivity(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'video_url' => ['required', 'url', 'max:255'],
            'thumbnail' => ['required', 'url', 'max:255'],
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
