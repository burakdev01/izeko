<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\LiveStreamController;
use App\Models\Activity;
use App\Models\Announcement;
use App\Models\BlogPost;
use App\Models\HeroSlide;
use App\Models\LiveStream;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $slides = HeroSlide::orderBy('sort_order')
        ->orderByDesc('id')
        ->get()
        ->map(fn (HeroSlide $slide) => [
            'id' => $slide->id,
            'title' => $slide->title,
            'subtitle' => $slide->subtitle ?? '',
            'image' => $slide->image,
            'video' => $slide->video,
            'poster' => $slide->poster,
        ]);

    return Inertia::render('Home', [
        'heroSlides' => $slides,
    ]);
})->name('home');

Route::get('/kurumsal/yonetim-kurulu-baskanimiz', function () {
    return Inertia::render('kurumsal/yonetim-kurulu-baskanimiz');
})->name('kurumsal.yonetim-kurulu-baskanimiz');

Route::get('/kurumsal/yonetim-kurulu', function () {
    return Inertia::render('kurumsal/yonetim-kurulu');
})->name('kurumsal.yonetim-kurulu');

Route::get('/kurumsal/denetim-kurulu', function () {
    return Inertia::render('kurumsal/denetim-kurulu');
})->name('kurumsal.denetim-kurulu');

Route::get('/kurumsal/oda-ekibimiz', function () {
    return Inertia::render('kurumsal/oda-ekibimiz');
})->name('kurumsal.oda-ekibimiz');

Route::get('/kurumsal/bolge-sorumlularimiz', function () {
    return Inertia::render('kurumsal/bolge-sorumlularimiz');
})->name('kurumsal.bolge-sorumlularimiz');

Route::get('/kurumsal/oda-hesap-numaralari', function () {
    return Inertia::render('kurumsal/oda-hesap-numaralari');
})->name('kurumsal.oda-hesap-numaralari');

Route::get('/kurumsal/kayit-ucretleri', function () {
    return Inertia::render('kurumsal/kayit-ucretleri');
})->name('kurumsal.kayit-ucretleri');

Route::get('/kurumsal/neden-emlak-ofisi', function () {
    return Inertia::render('kurumsal/neden-emlak-ofisi');
})->name('kurumsal.neden-emlak-ofisi');

Route::get('/kurumsal/izeko-nedir', function () {
    return Inertia::render('kurumsal/izeko-nedir');
})->name('kurumsal.izeko-nedir');

Route::get('/kurumsal/oda-kayit-islemleri', function () {
    return Inertia::render('kurumsal/oda-kayit-islemleri');
})->name('kurumsal.oda-kayit-islemleri');

Route::get('/faaliyetler', function () {
    $activities = Activity::where('active', true)
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn (Activity $activity) => [
            'id' => $activity->id,
            'title' => $activity->title,
            'date' => optional($activity->updated_at)->format('Y-m-d'),
            'videoUrl' => $activity->video_url,
            'thumbnail' => $activity->thumbnail,
        ]);

    return Inertia::render('faaliyetler', [
        'activities' => $activities,
    ]);
})->name('faaliyetler');

Route::get('/haberler', function () {
    $posts = BlogPost::where('active', true)
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn (BlogPost $post) => [
            'id' => $post->id,
            'image' => $post->image,
            'title' => $post->title,
            'excerpt' => $post->excerpt,
            'date' => optional($post->updated_at)->format('Y-m-d'),
        ]);

    return Inertia::render('haberler', [
        'posts' => $posts,
    ]);
})->name('haberler');

Route::get('/canli-yayinlar', function () {
    $streams = LiveStream::where('active', true)
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn (LiveStream $stream) => [
            'id' => $stream->id,
            'title' => $stream->title,
            'date' => optional($stream->updated_at)->format('Y-m-d'),
            'videoUrl' => $stream->video_url,
            'thumbnail' => $stream->thumbnail,
        ]);

    return Inertia::render('canli-yayinlar', [
        'streams' => $streams,
    ]);
})->name('canli-yayinlar');

Route::get('/duyurular', function () {
    $announcements = Announcement::where('active', true)
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn (Announcement $announcement) => [
            'id' => $announcement->id,
            'title' => $announcement->title,
            'subtitle' => $announcement->subtitle,
            'excerpt' => $announcement->excerpt,
            'image' => $announcement->image,
            'link' => $announcement->link,
            'date' => optional($announcement->updated_at)->format('Y-m-d'),
        ]);

    return Inertia::render('duyurular', [
        'announcements' => $announcements,
    ]);
})->name('duyurular');

Route::get('/ilanlar', function () {
    return Inertia::render('ilanlar');
})->name('ilanlar');

Route::get('/admin/login', function (Request $request) {
    $user = $request->user();

    if ($user) {
        if ($user->is_admin) {
            return redirect()->route('admin.dashboard');
        }

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    return Inertia::render('admin/login', [
        'canResetPassword' => Features::enabled(Features::resetPasswords()),
        'status' => $request->session()->get('status'),
    ]);
})->name('admin.login');

Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(
    function () {
        Route::get('/', function () {
            return Inertia::render('admin/dashboard', [
                'stats' => [
                    'activities' => Activity::count(),
                    'streams' => LiveStream::count(),
                    'posts' => BlogPost::count(),
                ],
            ]);
        })->name('dashboard');

        Route::resource('haberler', BlogPostController::class)
            ->parameters(['haberler' => 'blogPost']);
        Route::resource('faaliyetler', ActivityController::class)
            ->parameters(['faaliyetler' => 'activity']);
        Route::resource('canli-yayinlar', LiveStreamController::class)
            ->parameters(['canli-yayinlar' => 'liveStream']);
        Route::resource('duyurular', AnnouncementController::class)
            ->parameters(['duyurular' => 'announcement']);
    },
);


// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

require __DIR__.'/settings.php';
