<?php

namespace App\Http\Middleware;

use App\Models\Announcement;
use App\Models\BlogPost;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'articleSidebar' => fn () => [
                'announcements' => Announcement::where('active', true)
                    ->orderBy('sort_order')
                    ->orderByDesc('updated_at')
                    ->limit(3)
                    ->get()
                    ->map(fn (Announcement $announcement) => [
                        'id' => $announcement->id,
                        'title' => $announcement->title,
                        'subtitle' => $announcement->subtitle ?: null,
                        'description' => $announcement->excerpt ?: null,
                        'date' => $announcement->updated_at?->locale('tr')
                            ->translatedFormat('d F') ?? '',
                    ])
                    ->values(),
                'news' => BlogPost::where('active', true)
                    ->orderBy('sort_order')
                    ->orderByDesc('updated_at')
                    ->limit(3)
                    ->get()
                    ->map(fn (BlogPost $post) => [
                        'id' => $post->id,
                        'title' => $post->title,
                        'date' => $post->updated_at?->locale('tr')
                            ->translatedFormat('d F Y') ?? '',
                        'image' => $post->image,
                    ])
                    ->values(),
                'announcementsActionHref' => route('duyurular', [], false),
                'newsActionHref' => route('haberler', [], false),
            ],
        ];
    }
}
