<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroSlideController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $slides = HeroSlide::orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (HeroSlide $slide) => $this->mapSlide($slide));

        return Inertia::render('admin/hero-slides/index', [
            'slides' => $slides,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/hero-slides/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateSlide($request);

        $image = $this->storePublicFile($request, 'image_file', 'hero-slides');
        $poster = $this->storePublicFile(
            $request,
            'poster_file',
            'hero-slides',
        );

        if ($image) {
            $validated['image'] = $image;
        }

        if ($poster) {
            $validated['poster'] = $poster;
        }

        HeroSlide::create($validated);

        return redirect()
            ->route('admin.hero-slides.index')
            ->with('status', 'Slide eklendi.');
    }

    public function edit(HeroSlide $heroSlide)
    {
        return Inertia::render('admin/hero-slides/edit', [
            'slide' => $this->mapSlide($heroSlide),
        ]);
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $validated = $this->validateSlide($request, $heroSlide);

        $image = $this->storePublicFile($request, 'image_file', 'hero-slides');
        $poster = $this->storePublicFile(
            $request,
            'poster_file',
            'hero-slides',
        );

        if ($image) {
            $validated['image'] = $image;
        } elseif (
            ! $request->filled('image') &&
            ! $request->filled('video')
        ) {
            $validated['image'] = $heroSlide->image;
        }

        if ($poster) {
            $validated['poster'] = $poster;
        } elseif (! $request->filled('poster')) {
            $validated['poster'] = $heroSlide->poster;
        }

        $heroSlide->update($validated);

        return redirect()
            ->route('admin.hero-slides.index')
            ->with('status', 'Slide guncellendi.');
    }

    public function destroy(HeroSlide $heroSlide)
    {
        $heroSlide->delete();

        return redirect()
            ->route('admin.hero-slides.index')
            ->with('status', 'Slide silindi.');
    }

    private function validateSlide(
        Request $request,
        ?HeroSlide $heroSlide = null,
    ): array
    {
        $imageRules = ['nullable', 'url', 'max:255'];
        $videoRules = ['nullable', 'url', 'max:255'];
        $imageFileRules = ['nullable', 'image', 'max:5120'];

        if (! $heroSlide || (! $heroSlide->image && ! $heroSlide->video)) {
            $imageRules[] = 'required_without_all:video,image_file';
            $videoRules[] = 'required_without_all:image,image_file';
            $imageFileRules[] = 'required_without_all:image,video';
        }

        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'image' => $imageRules,
            'video' => $videoRules,
            'poster' => ['nullable', 'url', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'image_file' => $imageFileRules,
            'poster_file' => ['nullable', 'image', 'max:5120'],
        ]);
    }

    private function mapSlide(HeroSlide $slide): array
    {
        return [
            'id' => $slide->id,
            'title' => $slide->title,
            'subtitle' => $slide->subtitle,
            'image' => $slide->image,
            'video' => $slide->video,
            'poster' => $slide->poster,
            'sort_order' => $slide->sort_order,
        ];
    }
}
