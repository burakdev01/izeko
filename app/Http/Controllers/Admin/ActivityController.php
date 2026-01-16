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
        $activities = Activity::orderByDesc('updated_at')
            ->get()
            ->map(fn (Activity $activity) => $this->mapActivity($activity));

        return Inertia::render('admin/faaliyetler/index', [
            'activities' => $activities,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/faaliyetler/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateActivity($request);
        $validated['active'] = $request->boolean('active');

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
            ->route('admin.faaliyetler.index')
            ->with('status', 'Faaliyet eklendi.');
    }

    public function edit(Activity $activity)
    {
        return Inertia::render('admin/faaliyetler/edit', [
            'activity' => $this->mapActivity($activity),
        ]);
    }

    public function update(Request $request, Activity $activity)
    {
        $validated = $this->validateActivity($request, $activity);
        $validated['active'] = $request->boolean('active');

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
            ->route('admin.faaliyetler.index')
            ->with('status', 'Faaliyet guncellendi.');
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();

        return redirect()
            ->route('admin.faaliyetler.index')
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
            'video_url' => ['required', 'url', 'max:255'],
            'thumbnail' => $thumbnailRules,
            'thumbnail_file' => ['nullable', 'image', 'max:5120'],
            'active' => ['nullable', 'boolean'],
        ]);
    }

    private function mapActivity(Activity $activity): array
    {
        return [
            'id' => $activity->id,
            'title' => $activity->title,
            'date' => optional($activity->updated_at)->format('Y-m-d'),
            'video_url' => $activity->video_url,
            'thumbnail' => $activity->thumbnail,
            'active' => $activity->active,
        ];
    }
}
