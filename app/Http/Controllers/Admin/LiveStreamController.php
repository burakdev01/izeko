<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\LiveStream;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LiveStreamController extends Controller
{
    use HandlesUploads;
    public function index()
    {
        $streams = LiveStream::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (LiveStream $stream) => $this->mapStream($stream));

        return Inertia::render('admin/canli-yayinlar/index', [
            'streams' => $streams,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/canli-yayinlar/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateStream($request);
        $validated['active'] = $request->boolean('active');
        $validated['sort_order'] = (LiveStream::max('sort_order') ?? 0) + 1;

        $thumbnail = $this->storePublicFile(
            $request,
            'thumbnail_file',
            'live-streams',
        );

        if ($thumbnail) {
            $validated['thumbnail'] = $thumbnail;
        }

        LiveStream::create($validated);

        return redirect()
            ->route('admin.canli-yayinlar.index')
            ->with('status', "Canl\u{0131} yay\u{0131}n eklendi.");
    }

    public function edit(LiveStream $liveStream)
    {
        return Inertia::render('admin/canli-yayinlar/edit', [
            'stream' => $this->mapStream($liveStream),
        ]);
    }

    public function update(Request $request, LiveStream $liveStream)
    {
        $validated = $this->validateStream($request, $liveStream);
        $validated['active'] = $request->boolean('active');

        $thumbnail = $this->storePublicFile(
            $request,
            'thumbnail_file',
            'live-streams',
        );

        if ($thumbnail) {
            $validated['thumbnail'] = $thumbnail;
        } elseif (! $request->filled('thumbnail')) {
            $validated['thumbnail'] = $liveStream->thumbnail;
        }

        $liveStream->update($validated);

        return redirect()
            ->route('admin.canli-yayinlar.index')
            ->with('status', "Canl\u{0131} yay\u{0131}n g\u{00FC}ncellendi.");
    }

    public function destroy(LiveStream $liveStream)
    {
        $liveStream->delete();

        return redirect()
            ->route('admin.canli-yayinlar.index')
            ->with('status', "Canl\u{0131} yay\u{0131}n silindi.");
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:live_streams,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            LiveStream::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.canli-yayinlar.index')
            ->with('status', "S\u{0131}ralama g\u{00FC}ncellendi.");
    }

    private function validateStream(
        Request $request,
        ?LiveStream $liveStream = null,
    ): array {
        $thumbnailRules = ['nullable', 'url', 'max:255'];

        if (! $liveStream || ! $liveStream->thumbnail) {
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

    private function mapStream(LiveStream $stream): array
    {
        return [
            'id' => $stream->id,
            'title' => $stream->title,
            'date' => optional($stream->updated_at)->format('Y-m-d'),
            'video_url' => $stream->video_url,
            'thumbnail' => $stream->thumbnail,
            'active' => $stream->active,
            'sort_order' => $stream->sort_order,
        ];
    }
}
