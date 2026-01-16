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
        $posts = BlogPost::orderByDesc('updated_at')
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

        $image = $this->storePublicFile($request, 'image_file', 'blog');

        if ($image) {
            $validated['image'] = $image;
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

        $image = $this->storePublicFile($request, 'image_file', 'blog');

        if ($image) {
            $validated['image'] = $image;
        } elseif (! $request->filled('image')) {
            $validated['image'] = $blogPost->image;
        }

        $blogPost->update($validated);

        return redirect()
            ->route('admin.haberler.index')
            ->with('status', 'Haber guncellendi.');
    }

    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return redirect()
            ->route('admin.haberler.index')
            ->with('status', 'Haber silindi.');
    }

    private function validatePost(
        Request $request,
        ?BlogPost $blogPost = null,
    ): array {
        $imageRules = ['nullable', 'url', 'max:255'];

        if (! $blogPost || ! $blogPost->image) {
            $imageRules[] = 'required_without:image_file';
        }

        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['required', 'string', 'max:1000'],
            'content' => ['required', 'string'],
            'image' => $imageRules,
            'image_file' => ['nullable', 'image', 'max:5120'],
            'active' => ['nullable', 'boolean'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:1000'],
            'seo_url' => ['nullable', 'string', 'max:255'],
        ]);
    }

    private function mapPost(BlogPost $post): array
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'excerpt' => $post->excerpt,
            'content' => $post->content,
            'image' => $post->image,
            'active' => $post->active,
            'seo_title' => $post->seo_title,
            'seo_description' => $post->seo_description,
            'seo_url' => $post->seo_url,
            'date' => optional($post->updated_at)->format('Y-m-d'),
        ];
    }
}
