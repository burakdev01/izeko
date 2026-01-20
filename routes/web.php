<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\LiveStreamController;
use App\Models\Activity;
use App\Models\Announcement;
use App\Models\BlogPost;
use App\Models\Faq;
use App\Models\HeroSlide;
use App\Models\LiveStream;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
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
            'image' => $slide->mediaUrl($slide->image),
            'video' => $slide->mediaUrl($slide->video),
            'poster' => $slide->mediaUrl($slide->poster),
        ]);

    $blogPosts = BlogPost::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->limit(3)
        ->get()
        ->map(fn (BlogPost $post) => [
            'id' => $post->id,
            'image' => $post->image,
            'title' => $post->title,
            'slug' => $post->seo_url ?? Str::slug($post->title),
            'date' => optional($post->updated_at)->format('Y-m-d'),
        ]);

    $announcements = Announcement::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->limit(3)
        ->get()
        ->map(fn (Announcement $announcement) => [
            'id' => $announcement->id,
            'title' => $announcement->title,
            'image' => $announcement->image,
            'link' => $announcement->link,
            'detail_url' => route(
                'duyurular.show',
                ['slug' => Str::slug($announcement->title)],
                false,
            ),
            'date' => optional($announcement->updated_at)->format('Y-m-d'),
        ]);

    $quickAccessItems = [
        [
            'id' => 'neden-emlak',
            'icon' => 'info',
            'title' => 'Neden Emlak Ofisiyle Çalışmalısınız?',
            'description' => 'Profesyonel desteğin avantajları',
            'href' => route('kurumsal.neden-emlak-ofisi', [], false),
        ],
        [
            'id' => 'izeko-nedir',
            'icon' => 'globe',
            'title' => 'izeko.org.tr Nedir?',
            'description' => 'Web sitemiz hakkında detaylı bilgi',
            'href' => route('kurumsal.izeko-nedir', [], false),
        ],
        [
            'id' => 'oda-kayit',
            'icon' => 'user-plus',
            'title' => 'Oda Kayıt İşlemleri',
            'description' => 'Üyelik başvuruları ve kayıt prosedürleri',
            'href' => route('kurumsal.oda-kayit-islemleri', [], false),
        ],
        [
            'id' => 'hesap-numaralari',
            'icon' => 'building',
            'title' => 'Oda Hesap Numaralarımız',
            'description' => 'Banka ve ödeme bilgilerimiz',
            'href' => route('kurumsal.oda-hesap-numaralari', [], false),
        ],
        [
            'id' => 'expertiz',
            'icon' => 'check-square',
            'title' => 'Expertiz Talep Edin!',
            'description' => 'Güvenilir gayrimenkul değerleme hizmeti',
            'href' => 'mailto:info@izeko.org.tr',
            'external' => true,
        ],
        [
            'id' => 'tkgm',
            'icon' => 'map-pin',
            'title' => 'TKGM Parsel Sorgulama',
            'description' => 'Tapu ve Kadastro Genel Müdürlüğü parsel sorgulama servisi',
            'href' => 'https://parselsorgu.tkgm.gov.tr/',
            'external' => true,
        ],
    ];

    $faqItems = Faq::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn (Faq $faq) => [
            'question' => $faq->question,
            'answer' => $faq->answer,
        ])
        ->values();

    return Inertia::render('Home', [
        'heroSlides' => $slides,
        'blogPosts' => $blogPosts,
        'announcements' => $announcements,
        'quickAccessItems' => $quickAccessItems,
        'faqItems' => $faqItems,
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
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn (Activity $activity) => [
            'id' => $activity->id,
            'title' => $activity->title,
            'date' => optional($activity->updated_at)->format('Y-m-d'),
            'videoUrl' => $activity->youtubeUrl() ?? $activity->video_url,
            'thumbnail' => $activity->thumbnail ?: $activity->youtubeThumbnail(),
        ]);

    return Inertia::render('faaliyetler', [
        'activities' => $activities,
    ]);
})->name('faaliyetler');

Route::get('/haberler', function () {
    $posts = BlogPost::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn (BlogPost $post) => [
            'id' => $post->id,
            'image' => $post->image,
            'title' => $post->title,
            'slug' => $post->seo_url ?? Str::slug($post->title),
            'date' => optional($post->updated_at)->format('Y-m-d'),
        ]);

    return Inertia::render('haberler', [
        'posts' => $posts,
    ]);
})->name('haberler');

Route::get('/haberler/{slug}', function (string $slug) {
    $post = BlogPost::where('active', true)
        ->where('seo_url', $slug)
        ->first();

    if (! $post) {
        $post = BlogPost::where('active', true)
            ->whereNull('seo_url')
            ->get()
            ->first(fn (BlogPost $item) => Str::slug($item->title) === $slug);
    }

    abort_unless($post, 404);

    return Inertia::render('haberler-detay', [
        'post' => [
            'id' => $post->id,
            'title' => $post->title,
            'image' => $post->image,
            'content' => $post->content,
            'seo_title' => $post->seo_title,
            'seo_description' => $post->seo_description,
            'slug' => $post->seo_url ?? Str::slug($post->title),
            'date' => optional($post->updated_at)->format('Y-m-d'),
        ],
    ]);
})->name('haberler.show');

Route::get('/canli-yayinlar', function () {
    $streams = LiveStream::where('active', true)
        ->orderBy('sort_order')
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
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn (Announcement $announcement) => [
            'id' => $announcement->id,
            'title' => $announcement->title,
            'image' => $announcement->image,
            'link' => $announcement->link,
            'detail_url' => route(
                'duyurular.show',
                ['slug' => Str::slug($announcement->title)],
                false,
            ),
            'date' => optional($announcement->updated_at)->format('Y-m-d'),
        ]);

    return Inertia::render('duyurular', [
        'announcements' => $announcements,
    ]);
})->name('duyurular');

Route::get('/duyurular/{slug}', function (string $slug) {
    $announcement = Announcement::where('active', true)->get()->first(
        fn (Announcement $item) => Str::slug($item->title) === $slug,
    );

    abort_unless($announcement, 404);

    return Inertia::render('duyurular-detay', [
        'announcement' => [
            'id' => $announcement->id,
            'title' => $announcement->title,
            'content' => $announcement->content,
            'image' => $announcement->image,
            'link' => $announcement->link,
            'slug' => Str::slug($announcement->title),
            'date' => optional($announcement->updated_at)->format('Y-m-d'),
        ],
    ]);
})->name('duyurular.show');

Route::get('/ofisler', function () {
    return Inertia::render('ofisler');
})->name('ofisler');

Route::get('/iletisim', function () {
    return Inertia::render('iletisim');
})->name('iletisim');

Route::get('/kullanim-kosullari', function () {
    return Inertia::render('kullanim-kosullari');
})->name('kullanim-kosullari');

Route::get('/hukuki-sartlar', function () {
    return Inertia::render('hukuki-sartlar');
})->name('hukuki-sartlar');

Route::get('/gizlilik-sozlesmesi', function () {
    return Inertia::render('gizlilik-sozlesmesi');
})->name('gizlilik-sozlesmesi');

Route::get('/sss', function () {
    $faqItems = Faq::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn (Faq $faq) => [
            'question' => $faq->question,
            'answer' => $faq->answer,
        ])
        ->values();

    return Inertia::render('sss', [
        'faqItems' => $faqItems,
    ]);
})->name('sss');

Route::get('/mevzuat', function () {
    return redirect()->route('duyurular');
})->name('mevzuat');

Route::get('/ilanlar', function () {
    return Inertia::render('ilanlar');
})->name('ilanlar');

Route::get('/ilanlar/{slug}', function (string $slug) {
    return Inertia::render('ilanlar-detay');
})->name('ilanlar.show');

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

        Route::patch('haberler/reorder', [BlogPostController::class, 'reorder'])
            ->name('haberler.reorder');
        Route::patch('faaliyetler/reorder', [ActivityController::class, 'reorder'])
            ->name('faaliyetler.reorder');
        Route::patch('canli-yayinlar/reorder', [LiveStreamController::class, 'reorder'])
            ->name('canli-yayinlar.reorder');
        Route::patch('duyurular/reorder', [AnnouncementController::class, 'reorder'])
            ->name('duyurular.reorder');
        Route::patch('hero-slides/reorder', [HeroSlideController::class, 'reorder'])
            ->name('hero-slides.reorder');
        Route::patch('sss/reorder', [FaqController::class, 'reorder'])
            ->name('sss.reorder');

        Route::resource('haberler', BlogPostController::class)
            ->parameters(['haberler' => 'blogPost']);
        Route::resource('faaliyetler', ActivityController::class)
            ->parameters(['faaliyetler' => 'activity']);
        Route::resource('canli-yayinlar', LiveStreamController::class)
            ->parameters(['canli-yayinlar' => 'liveStream']);
        Route::resource('duyurular', AnnouncementController::class)
            ->parameters(['duyurular' => 'announcement']);
        Route::resource('hero-slides', HeroSlideController::class)
            ->parameters(['hero-slides' => 'heroSlide']);
        Route::resource('sss', FaqController::class)
            ->parameters(['sss' => 'faq']);
    },
);

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::get('/test', function () {
    return "test";
})->name('test');

require __DIR__.'/settings.php';