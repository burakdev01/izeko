<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $posts = BlogPost::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (BlogPost $post) => $this->mapPost($post));

        return Inertia::render('admin/haberler/index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/haberler/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validatePost($request);
        $validated['active'] = $request->boolean('active');
        $validated['sort_order'] = (BlogPost::max('sort_order') ?? 0) + 1;

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'blogs',
            'uploads',
        );

        if ($image) {
            $validated['image'] = $image;
        }

        if ($request->filled('seo_url')) {
            $validated['seo_url'] = \Illuminate\Support\Str::slug($validated['seo_url']);
        }

        BlogPost::create($validated);

        return redirect()
            ->route('admin.haberler.index')
            ->with('status', 'Haber eklendi.');
    }

    public function edit(BlogPost $blogPost)
    {
        return Inertia::render('admin/haberler/edit', [
            'post' => $this->mapPost($blogPost),
        ]);
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $this->validatePost($request, $blogPost);
        $validated['active'] = $request->boolean('active');

        $removeImage = $request->boolean('remove_image');
        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'blogs',
            'uploads',
        );

        if ($removeImage) {
            $validated['image'] = '';
        } elseif ($image) {
            $validated['image'] = $image;
        } else {
            $validated['image'] = $blogPost->image;
        }

        if ($request->filled('seo_url')) {
            $validated['seo_url'] = \Illuminate\Support\Str::slug($validated['seo_url']);
        }

        $blogPost->update($validated);

        return redirect()
            ->route('admin.haberler.index')
            ->with('status', "Haber g\u{00FC}ncellendi.");
    }

    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return redirect()
            ->route('admin.haberler.index')
            ->with('status', 'Haber silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:blog_posts,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            BlogPost::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.haberler.index')
            ->with('status', "S\u{0131}ralama g\u{00FC}ncellendi.");
    }

    private function validatePost(
        Request $request,
        ?BlogPost $blogPost = null,
    ): array {
        $imageRules = ['nullable', 'string', 'max:255'];

        if (! $blogPost) {
            $imageRules[] = 'required_without:image_file';
        }

        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image' => $imageRules,
            'image_file' => ['nullable', 'image', 'max:5120'],
            'remove_image' => ['nullable', 'boolean'],
            'active' => ['nullable', 'boolean'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:1000'],
            'seo_keywords' => ['nullable', 'string', 'max:1000'],
            'seo_url' => ['nullable', 'string', 'max:255'],
        ]);
    }

    private function mapPost(BlogPost $post): array
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'image' => $post->image,
            'active' => $post->active,
            'seo_title' => $post->seo_title,
            'seo_description' => $post->seo_description,
            'seo_keywords' => $post->seo_keywords,
            'seo_url' => $post->seo_url,
            'date' => optional($post->updated_at)->format('Y-m-d'),
            'sort_order' => $post->sort_order,
        ];
    }
}
