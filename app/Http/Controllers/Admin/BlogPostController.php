<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::orderByDesc('date')
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
        $validated = $this->validatePost($request);

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

    private function validatePost(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['required', 'string', 'max:1000'],
            'content' => ['required', 'string'],
            'image' => ['required', 'url', 'max:255'],
            'date' => ['required', 'date'],
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
            'date' => optional($post->date)->format('Y-m-d'),
        ];
    }
}
