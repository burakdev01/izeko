<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LiveStream;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LiveStreamController extends Controller
{
    public function index()
    {
        $streams = LiveStream::orderByDesc('date')
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

        LiveStream::create($validated);

        return redirect()
            ->route('admin.canli-yayinlar.index')
            ->with('status', 'Canli yayin eklendi.');
    }

    public function edit(LiveStream $liveStream)
    {
        return Inertia::render('admin/canli-yayinlar/edit', [
            'stream' => $this->mapStream($liveStream),
        ]);
    }

    public function update(Request $request, LiveStream $liveStream)
    {
        $validated = $this->validateStream($request);

        $liveStream->update($validated);

        return redirect()
            ->route('admin.canli-yayinlar.index')
            ->with('status', 'Canli yayin guncellendi.');
    }

    public function destroy(LiveStream $liveStream)
    {
        $liveStream->delete();

        return redirect()
            ->route('admin.canli-yayinlar.index')
            ->with('status', 'Canli yayin silindi.');
    }

    private function validateStream(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'video_url' => ['required', 'url', 'max:255'],
            'thumbnail' => ['required', 'url', 'max:255'],
        ]);
    }

    private function mapStream(LiveStream $stream): array
    {
        return [
            'id' => $stream->id,
            'title' => $stream->title,
            'date' => optional($stream->date)->format('Y-m-d'),
            'video_url' => $stream->video_url,
            'thumbnail' => $stream->thumbnail,
        ];
    }
}
