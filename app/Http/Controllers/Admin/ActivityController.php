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
        $activities = Activity::orderBy('sort_order')
            ->orderByDesc('updated_at')
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
        $validated['sort_order'] = (Activity::max('sort_order') ?? 0) + 1;

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
            ->with('status', "Faaliyet g\u{00FC}ncellendi.");
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();

        return redirect()
            ->route('admin.faaliyetler.index')
            ->with('status', 'Faaliyet silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:activities,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            Activity::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.faaliyetler.index')
            ->with('status', "S\u{0131}ralama g\u{00FC}ncellendi.");
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
            'sort_order' => $activity->sort_order,
        ];
    }
}
