<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\ListingController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\SpotlightController;
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

    $spotlights = \App\Models\Spotlight::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn (\App\Models\Spotlight $spotlight) => [
            'id' => $spotlight->id,
            'title' => $spotlight->title,
            'description' => $spotlight->description,
            'slug' => $spotlight->slug,
            'image' => $spotlight->image, // Assuming accessor or raw path
            'date' => optional($spotlight->updated_at)->locale('tr')->translatedFormat('d F Y'), // Format date for display
        ]);

    return Inertia::render('Home', [
        'heroSlides' => $slides,
        'spotlights' => $spotlights,
        'blogPosts' => $blogPosts,
        'announcements' => $announcements,
        'quickAccessItems' => $quickAccessItems,
        'faqItems' => $faqItems,
    ]);
})->name('home');

Route::get('/kurumsal/yonetim-kurulu-baskanimiz', function () {
    $message = \App\Models\ChairmanMessage::first();

    return Inertia::render('kurumsal/yonetim-kurulu-baskanimiz', [
        'data' => $message ? [
            'content' => $message->content,
        ] : null,
    ]);
})->name('kurumsal.yonetim-kurulu-baskanimiz');

Route::get('/kurumsal/yonetim-kurulu', function () {
    $members = \App\Models\BoardMember::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn ($member) => [
            'name' => $member->name,
            'title' => $member->title,
            'image' => $member->image ? (
                str_starts_with($member->image, 'http')
                    ? $member->image
                    : config('filesystems.disks.uploads.url') . '/board_members/' . $member->image
            ) : null,
        ]);

    return Inertia::render('kurumsal/yonetim-kurulu', [
        'members' => $members,
    ]);
})->name('kurumsal.yonetim-kurulu');

Route::get('/kurumsal/denetim-kurulu', function () {
    $members = \App\Models\SupervisoryBoardMember::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn ($member) => [
            'name' => $member->name,
            'title' => $member->title,
            'image' => $member->image ? config('filesystems.disks.uploads.url') . '/supervisory_board_members/' . $member->image : null,
        ]);

    return Inertia::render('kurumsal/denetim-kurulu', [
        'members' => $members,
    ]);
})->name('kurumsal.denetim-kurulu');

Route::get('/kurumsal/oda-ekibimiz', function () {
    return Inertia::render('kurumsal/oda-ekibimiz');
})->name('kurumsal.oda-ekibimiz');

Route::get('/kurumsal/bolge-sorumlularimiz', function () {
    $managers = \App\Models\RegionalManager::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn ($manager) => [
            'name' => $manager->name,
            'region' => $manager->title, // Map title to region for frontend compatibility
        ]);

    return Inertia::render('kurumsal/bolge-sorumlularimiz', [
        'managers' => $managers,
    ]);
})->name('kurumsal.bolge-sorumlularimiz');

Route::get('/kurumsal/oda-hesap-numaralari', function () {
    $accounts = \App\Models\BankAccount::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn ($account) => [
            'bank_name' => $account->bank_name,
            'branch_name' => $account->branch_name,
            'branch_code' => $account->branch_code,
            'account_no' => $account->account_no,
            'iban' => $account->iban,
            'account_name' => $account->account_name,
            'description' => $account->description,
            'image' => $account->image ? (
                str_starts_with($account->image, 'http')
                    ? $account->image
                    : config('filesystems.disks.uploads.url') . '/bank_accounts/' . $account->image
            ) : null,
        ]);

    return Inertia::render('kurumsal/oda-hesap-numaralari', [
        'accounts' => $accounts,
    ]);
})->name('kurumsal.oda-hesap-numaralari');

Route::get('/kurumsal/kayit-ucretleri', function () {
    $fees = \App\Models\RegistrationFee::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get();

    return Inertia::render('kurumsal/kayit-ucretleri', [
        'fees' => $fees,
    ]);
})->name('kurumsal.kayit-ucretleri');

Route::get('/kurumsal/neden-emlak-ofisi', function () {
    $item = \App\Models\WhyChooseUs::first();

    return Inertia::render('kurumsal/neden-emlak-ofisi', [
        'item' => $item,
    ]);
})->name('kurumsal.neden-emlak-ofisi');

Route::get('/kurumsal/izeko-nedir', function () {
    $item = \App\Models\AboutIzeko::first();

    return Inertia::render('kurumsal/izeko-nedir', [
        'item' => $item,
    ]);
})->name('kurumsal.izeko-nedir');

Route::get('/kurumsal/oda-kayit-islemleri', function () {
    $item = \App\Models\ChamberRegistration::first();

    return Inertia::render('kurumsal/oda-kayit-islemleri', [
        'item' => $item,
    ]);
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
    ])->withViewData([
        'meta_title' => $post->seo_title ?? $post->title,
        'meta_description' => $post->seo_description,
        'meta_keywords' => $post->seo_keywords,
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
    $announcement = Announcement::where('active', true)
        ->where('seo_url', $slug)
        ->first();

    if (! $announcement) {
        $announcement = Announcement::where('active', true)
            ->whereNull('seo_url')
            ->get()
            ->first(fn (Announcement $item) => Str::slug($item->title) === $slug);
    }

    abort_unless($announcement, 404);

    return Inertia::render('duyurular-detay', [
        'announcement' => [
            'id' => $announcement->id,
            'title' => $announcement->title,
            'content' => $announcement->content,
            'image' => $announcement->image,
            'link' => $announcement->link,
            'seo_title' => $announcement->seo_title,
            'seo_description' => $announcement->seo_description,
            'slug' => $announcement->seo_url ?? Str::slug($announcement->title),
            'date' => optional($announcement->updated_at)->format('Y-m-d'),
        ],
    ])->withViewData([
        'meta_title' => $announcement->seo_title ?? $announcement->title,
        'meta_description' => $announcement->seo_description,
        'meta_keywords' => $announcement->seo_keywords,
    ]);
})->name('duyurular.show');

Route::get('/ofisler', function () {
    return Inertia::render('ofisler');
})->name('ofisler');

Route::post('/iletisim', [\App\Http\Controllers\ContactController::class, 'store'])
    ->name('iletisim.store');

Route::get('/iletisim', [\App\Http\Controllers\ContactController::class, 'index'])
    ->name('iletisim');

Route::get('/acik-riza-metni', function () {
    return Inertia::render('acik-riza-metni');
})->name('acik-riza-metni');

Route::get('/kvkk-aydinlatma-metni', function () {
    return Inertia::render('kvkk-aydinlatma-metni');
})->name('kvkk-aydinlatma-metni');


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
            $users = \App\Models\User::where('status', 'pending')
                ->orderByDesc('created_at')
                ->take(5)
                ->get()
                ->map(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'surname' => $user->surname,
                    'email' => $user->email,
                    'phone' => $user->phone_number,
                    'date' => $user->created_at->format('d.m.Y'),
                ]);

            return Inertia::render('admin/dashboard', [
                'stats' => [
                    'users' => \App\Models\User::count(),
                    'offices' => \App\Models\Office::count(),
                    'listings' => \App\Models\Listing::count(),
                    'active_listings' => \App\Models\Listing::where('listing_status', 'active')->count(),
                    'pending_listings' => \App\Models\Listing::where('listing_status', 'pending')->count(),
                    'activities' => Activity::count(),
                    'streams' => LiveStream::count(),
                    'posts' => BlogPost::count(),
                ],
                'recentUsers' => $users,
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
        Route::patch('board-members/reorder', [\App\Http\Controllers\Admin\BoardMemberController::class, 'reorder'])
            ->name('board-members.reorder');

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

        Route::patch('ilanlar/reorder', [ListingController::class, 'reorder'])
            ->name('ilanlar.reorder');

        Route::resource('ilanlar', ListingController::class)
            ->parameters(['ilanlar' => 'listing']);

        Route::resource('kullanicilar', UserController::class)
            ->parameters(['kullanicilar' => 'user']);

        Route::resource('ofisler', \App\Http\Controllers\Admin\OfficeController::class)
            ->parameters(['ofisler' => 'office']);

        Route::get('bildirimler/email', [\App\Http\Controllers\Admin\NotificationController::class, 'emailIndex'])
            ->name('notifications.email');
        Route::get('bildirimler/email/yeni', [\App\Http\Controllers\Admin\NotificationController::class, 'emailCreate'])
            ->name('notifications.email.create');
        Route::post('bildirimler/email', [\App\Http\Controllers\Admin\NotificationController::class, 'emailStore'])
            ->name('notifications.email.store');

        Route::get('bildirimler/sms', [\App\Http\Controllers\Admin\NotificationController::class, 'smsIndex'])
            ->name('notifications.sms');
        Route::get('bildirimler/sms/yeni', [\App\Http\Controllers\Admin\NotificationController::class, 'smsCreate'])
            ->name('notifications.sms.create');
        Route::post('bildirimler/sms', [\App\Http\Controllers\Admin\NotificationController::class, 'smsStore'])
            ->name('notifications.sms.store');
        Route::patch('spotlights/reorder', [SpotlightController::class, 'reorder'])
            ->name('spotlights.reorder');
        Route::resource('spotlights', SpotlightController::class)
            ->parameters(['spotlights' => 'spotlight']);
            
        Route::resource('iletisim', \App\Http\Controllers\Admin\ContactMessageController::class)
            ->parameters(['iletisim' => 'contactMessage'])
            ->only(['index', 'show', 'destroy']);

        Route::resource('board-members', \App\Http\Controllers\Admin\BoardMemberController::class)
            ->parameters(['board-members' => 'boardMember']);

        Route::get('chairman-message', [\App\Http\Controllers\Admin\ChairmanMessageController::class, 'edit'])->name('chairman-message.edit');
        Route::post('chairman-message', [\App\Http\Controllers\Admin\ChairmanMessageController::class, 'update'])->name('chairman-message.update');

        Route::post('supervisory-board/reorder', [\App\Http\Controllers\Admin\SupervisoryBoardMemberController::class, 'reorder'])->name('supervisory-board.reorder');
        Route::resource('supervisory-board', \App\Http\Controllers\Admin\SupervisoryBoardMemberController::class)
            ->parameters(['supervisory-board' => 'supervisoryBoardMember']);

        Route::patch('regional-managers/reorder', [\App\Http\Controllers\Admin\RegionalManagerController::class, 'reorder'])
            ->name('regional-managers.reorder');
        Route::resource('regional-managers', \App\Http\Controllers\Admin\RegionalManagerController::class)
            ->parameters(['regional-managers' => 'regionalManager']);

        Route::patch('bank-accounts/reorder', [\App\Http\Controllers\Admin\BankAccountController::class, 'reorder'])
            ->name('bank-accounts.reorder');
        Route::resource('bank-accounts', \App\Http\Controllers\Admin\BankAccountController::class)
            ->parameters(['bank-accounts' => 'bankAccount']);

        Route::patch('registration-fees/reorder', [\App\Http\Controllers\Admin\RegistrationFeeController::class, 'reorder'])
            ->name('registration-fees.reorder');
        Route::resource('registration-fees', \App\Http\Controllers\Admin\RegistrationFeeController::class)
            ->parameters(['registration-fees' => 'registrationFee']);

        // Why Choose Us
        Route::get('why-choose-us/edit', [\App\Http\Controllers\Admin\WhyChooseUsController::class, 'edit'])->name('why-choose-us.edit');
        Route::post('why-choose-us/update', [\App\Http\Controllers\Admin\WhyChooseUsController::class, 'update'])->name('why-choose-us.update');

        // About Izeko
        Route::get('about-izeko/edit', [\App\Http\Controllers\Admin\AboutIzekoController::class, 'edit'])->name('about-izeko.edit');
        Route::post('about-izeko/update', [\App\Http\Controllers\Admin\AboutIzekoController::class, 'update'])->name('about-izeko.update');

        // Chamber Registration
        Route::get('chamber-registration/edit', [\App\Http\Controllers\Admin\ChamberRegistrationController::class, 'edit'])->name('chamber-registration.edit');
        Route::post('chamber-registration/update', [\App\Http\Controllers\Admin\ChamberRegistrationController::class, 'update'])->name('chamber-registration.update');
    },
);

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::get('/test', function () {
    return "testa";
})->name('test');

Route::get('/manset/{slug}', function (string $slug) {
    $spotlight = \App\Models\Spotlight::where('active', true)
        ->where('slug', $slug)
        ->first();

    abort_unless($spotlight, 404);

    return Inertia::render('manset-detay', [
        'spotlight' => [
            'id' => $spotlight->id,
            'title' => $spotlight->title,
            'description' => $spotlight->description,
            'content' => $spotlight->content,
            'image' => $spotlight->image,
            'date' => optional($spotlight->updated_at)->format('d F Y'),
            'seo_title' => $spotlight->seo_title,
            'seo_description' => $spotlight->seo_description,
            'seo_keywords' => $spotlight->seo_keywords,
        ],
    ])->withViewData([
        'meta_title' => $spotlight->seo_title ?? $spotlight->title,
        'meta_description' => $spotlight->seo_description,
        'meta_keywords' => $spotlight->seo_keywords,
    ]);
})->name('manset.show');

require __DIR__.'/settings.php';