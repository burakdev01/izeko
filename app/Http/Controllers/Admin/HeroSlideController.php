<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\RedirectResponse;
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

        if (
            ! array_key_exists('sort_order', $validated) ||
            $validated['sort_order'] === null
        ) {
            $validated['sort_order'] =
                (HeroSlide::max('sort_order') ?? 0) + 1;
        }

        $image = $this->storePublicFileName(
            $request,
            'image_file',
            'hero-slides',
            'uploads',
        );
        $video = $this->storePublicFileName(
            $request,
            'video_file',
            'hero-slides',
            'uploads',
        );
        $poster = $this->storePublicFileName(
            $request,
            'poster_file',
            'hero-slides',
            'uploads',
        );

        if ($image) {
            $validated['image'] = $image;
        }

        if ($video) {
            $validated['video'] = $video;
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

        $removeImage = $request->boolean('remove_image');
        $removeVideo = $request->boolean('remove_video');

        $image = $this->storePublicFileName(
            $request,
            'image_file',
            'hero-slides',
            'uploads',
        );
        $video = $this->storePublicFileName(
            $request,
            'video_file',
            'hero-slides',
            'uploads',
        );
        $poster = $this->storePublicFileName(
            $request,
            'poster_file',
            'hero-slides',
            'uploads',
        );

        $validated['image'] = $removeImage
            ? null
            : $image ?? $this->normalizeMediaName($heroSlide->image);
        $validated['video'] = $removeVideo
            ? null
            : $video ?? $this->normalizeMediaName($heroSlide->video);
        $validated['poster'] =
            $poster ?? $this->normalizeMediaName($heroSlide->poster);

        $heroSlide->update($validated);

        return redirect()
            ->route('admin.hero-slides.index')
            ->with('status', "Slayt g\u{00FC}ncellendi.");
    }

    public function destroy(HeroSlide $heroSlide)
    {
        $heroSlide->delete();

        return redirect()
            ->route('admin.hero-slides.index')
            ->with('status', 'Slide silindi.');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:hero_slides,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            HeroSlide::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.hero-slides.index')
            ->with('status', "S\u{0131}ralama g\u{00FC}ncellendi.");
    }

    private function validateSlide(
        Request $request,
        ?HeroSlide $heroSlide = null,
    ): array {
        $imageFileRules = ['nullable', 'image', 'max:5120'];
        $videoFileRules = [
            'nullable',
            'file',
            'mimetypes:video/mp4,video/webm,video/ogg',
            'max:51200',
        ];
        $posterFileRules = ['nullable', 'image', 'max:5120'];

        if (! $heroSlide || (! $heroSlide->image && ! $heroSlide->video)) {
            $imageFileRules[] = 'required_without:video_file';
            $videoFileRules[] = 'required_without:image_file';
        }

        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'image_file' => $imageFileRules,
            'video_file' => $videoFileRules,
            'poster_file' => $posterFileRules,
            'remove_image' => ['nullable', 'boolean'],
            'remove_video' => ['nullable', 'boolean'],
        ]);
    }

    private function mapSlide(HeroSlide $slide): array
    {
        return [
            'id' => $slide->id,
            'title' => $slide->title,
            'subtitle' => $slide->subtitle,
            'image' => $slide->mediaUrl($slide->image),
            'video' => $slide->mediaUrl($slide->video),
            'poster' => $slide->mediaUrl($slide->poster),
            'sort_order' => $slide->sort_order,
        ];
    }

    private function normalizeMediaName(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        $path = parse_url($value, PHP_URL_PATH);

        return basename($path ?: $value);
    }
}
