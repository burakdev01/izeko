<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\ListingController;
use App\Http\Controllers\Admin\LiveStreamController;
use App\Http\Controllers\Admin\SpotlightController;
use App\Http\Controllers\Admin\UserController;
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
            'date' => $spotlight->updated_at ? $spotlight->updated_at->locale('tr')->translatedFormat('d F Y') : '-', // Format date for display
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
                    : config('filesystems.disks.uploads.url').'/board_members/'.$member->image
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
            'image' => $member->image ? config('filesystems.disks.uploads.url').'/supervisory_board_members/'.$member->image : null,
        ]);

    return Inertia::render('kurumsal/denetim-kurulu', [
        'members' => $members,
    ]);
})->name('kurumsal.denetim-kurulu');

Route::get('/kurumsal/oda-ekibimiz', function () {
    $members = \App\Models\ChamberTeam::where('active', true)
        ->orderBy('sort_order')
        ->orderByDesc('updated_at')
        ->get()
        ->map(fn ($member) => [
            'name' => $member->name,
            'title' => $member->title,
            'image' => $member->image ? (
                str_starts_with($member->image, 'http')
                    ? $member->image
                    : config('filesystems.disks.uploads.url').'/chamber_teams/'.$member->image
            ) : null,
        ]);

    return Inertia::render('kurumsal/oda-ekibimiz', [
        'members' => $members,
    ]);
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
                    : config('filesystems.disks.uploads.url').'/bank_accounts/'.$account->image
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

Route::get('/ilanlar', function (\Illuminate\Http\Request $request) {
    $query = \App\Models\Listing::where('listing_status', 'active');

    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('id', 'like', "%{$search}%");
        });
    }

    $listings = $query->with([
        'address.province',
        'address.district',
        'address.neighborhood',
        'attributes.attribute', // Load attribute definition to check IDs/Names
        'attributes.option',     // Load options for select-type attributes
    ])
        ->orderByDesc('created_at')
        ->paginate(10)
        ->through(function ($listing) {
            // Helpers to find specific attributes
            // User specified ID 3 is Room Count, ID 1 is Building Age, ID 4 is Floor Location, ID 5 is Floor Count
            $roomAttr = $listing->attributes->first(fn ($a) => $a->attribute_id === 3);
            $ageAttr = $listing->attributes->first(fn ($a) => $a->attribute_id === 1);
            $floorAttr = $listing->attributes->first(fn ($a) => $a->attribute_id === 4);
            $floorCountAttr = $listing->attributes->first(fn ($a) => $a->attribute_id === 5);

            // Try to find Area attribute (looking for common names or just assume it might be ID 1 or 2 if 3 is rooms,
            // but safer to fallback to 0 or try to find by name if we knew it exactly.
            // For now, let's try to find an attribute with 'm²' unit or containing 'Alan' in name if ID is unknown,
            // OR just map ID 3 for rooms and leave area 0 until user specifies.

            // Let's try to be smart for Area: Look for 'Brüt' or 'Alan' or unit 'm2'
            $areaAttr = $listing->attributes->first(fn ($a) => ($a->attribute && ($a->attribute->unit === 'm²' || str_contains($a->attribute->name, 'Brüt')) && ! str_contains($a->attribute->name, 'Net'))
            );

            $netAreaAttr = $listing->attributes->first(fn ($a) => ($a->attribute && ($a->attribute->unit === 'm²' || str_contains($a->attribute->name, 'Net')))
            );

            // Accessor for value
            $getValue = function ($attr) {
                if (! $attr) {
                    return null;
                }
                if ($attr->attribute->data_type === \App\Models\Attribute::TYPE_SELECT) {
                    // Use 'value' column as per user instruction and DB schema
                    return $attr->option ? $attr->option->value : null;
                }
                if ($attr->attribute->data_type === \App\Models\Attribute::TYPE_BOOLEAN) {
                    return $attr->value_bool ? 'Evet' : 'Hayır';
                }

                return $attr->value_string ?? $attr->value_int;
            };

            return [
                'id' => $listing->id,
                'title' => $listing->title,
                'price' => $listing->price,
                'date' => optional($listing->created_at)->format('Y-m-d') ?? '-',
                'location' => ($listing->address?->province?->name ?? '').' / '.($listing->address?->district?->name ?? '').' / '.($listing->address?->neighborhood?->name ?? ''),
                'city' => $listing->address?->province?->name ?? '',
                'image' => $listing->main_photo_path ? config('app.url')."/storage/listings/{$listing->id}/".$listing->main_photo_path : 'https://placehold.co/600x400?text=No+Image',
                'categoryId' => (string) $listing->category_id,
                'locationIds' => [
                    'province' => (string) $listing->address?->province_id,
                    'district' => (string) $listing->address?->district_id,
                    'neighborhood' => (string) $listing->address?->neighborhood_id,
                ],
                'area' => (float) ($getValue($areaAttr) ?? 0),
                'netArea' => (float) ($getValue($netAreaAttr) ?? 0),
                'rooms' => $getValue($roomAttr) ?? 'N/A',
                'buildingAge' => $getValue($ageAttr) ?? 'N/A',
                'floorLocation' => $getValue($floorAttr) ?? 'N/A',
                'floorCount' => $getValue($floorCountAttr) ?? 'N/A',
                'badges' => [],
            ];
        });

    // Dynamic Filter Data
    $listingCount = fn ($q) => $q->where('listing_status', 'active');

    // Recursive function to process categories and sum counts
    $processCategory = function ($category) use (&$processCategory) {
        $children = $category->children->map(fn ($child) => $processCategory($child));
        $ownCount = $category->listings_count;
        $totalCount = $ownCount + $children->sum('raw_count');

        return [
            'id' => (string) $category->id,
            'label' => $category->name,
            'count' => "({$totalCount})",
            'raw_count' => $totalCount, // Internally used for recursion
            'children' => $children->map(function ($child) {
                unset($child['raw_count']);

                return $child;
            })->values()->all(),
        ];
    };

    $categories = \App\Models\Category::withCount(['listings' => $listingCount])
        ->with(['children' => function ($q) use ($listingCount) {
            $q->withCount(['listings' => $listingCount])
                ->with(['children' => function ($q) use ($listingCount) {
                    $q->withCount(['listings' => $listingCount]);
                }]);
        }])
        ->whereNull('parent_id')
        ->get()
        ->map(fn ($c) => $processCategory($c));

    // Cleanup top-level raw_count
    $categories = $categories->map(function ($c) {
        unset($c['raw_count']);

        return $c;
    });

    // Hierarchical Locations
    $locations = \App\Models\Province::withCount(['listings' => fn ($q) => $q->where('listing_status', 'active')])
        ->with(['districts' => function ($q) {
            $q->withCount(['listings' => fn ($q3) => $q3->where('listing_status', 'active')])
                ->with(['neighborhoods' => function ($q4) {
                    $q4->withCount(['listings' => fn ($q6) => $q6->where('listing_status', 'active')]);
                }]);
        }])
        ->get()
        ->map(fn ($p) => [
            'id' => 'province-'.(string) $p->id,
            'label' => $p->name,
            'count' => "({$p->listings_count})",
            'children' => $p->districts->map(fn ($d) => [
                'id' => 'district-'.(string) $d->id,
                'label' => $d->name,
                'count' => "({$d->listings_count})",
                'children' => $d->neighborhoods->map(fn ($n) => [
                    'id' => 'neighborhood-'.(string) $n->id,
                    'label' => $n->name,
                    'count' => "({$n->listings_count})",
                    // No children for neighborhoods
                ])->values(),
            ])->values(),
        ]);

    // Room Options (Attribute ID 3)
    $roomOptions = \App\Models\AttributeOption::where('attribute_id', 3)
        ->orderBy('sort_order', 'asc')
        ->get()
        ->map(fn ($o) => [
            'id' => 'room-'.$o->id,
            'label' => $o->value, // Use valid column 'value'
            'value' => $o->value,
        ]);

    // Building Age Options (Attribute ID 1)
    $buildingAgeOptions = \App\Models\AttributeOption::where('attribute_id', 1)
        ->orderBy('sort_order', 'asc')
        ->get()
        ->map(fn ($o) => [
            'id' => 'age-'.$o->id,
            'label' => $o->value,
            'value' => $o->value,
        ]);

    // Floor Location Options (Attribute ID 4)
    $floorLocationOptions = \App\Models\AttributeOption::where('attribute_id', 4)
        ->orderBy('sort_order', 'asc')
        ->get()
        ->map(fn ($o) => [
            'id' => 'floor-'.$o->id,
            'label' => $o->value,
            'value' => $o->value,
        ]);

    // Floor Count Options (Attribute ID 5)
    $floorCountOptions = \App\Models\AttributeOption::where('attribute_id', 5)
        ->orderBy('sort_order', 'asc')
        ->get()
        ->map(fn ($o) => [
            'id' => 'floorcount-'.$o->id,
            'label' => $o->value,
            'value' => $o->value,
        ]);

    return Inertia::render('ilanlar', [
        'filters' => $request->only(['search']),
        'listings' => $listings,
        'categories' => $categories,
        'locations' => $locations,
        'roomOptions' => $roomOptions,
        'buildingAgeOptions' => $buildingAgeOptions,
        'floorLocationOptions' => $floorLocationOptions,
        'floorCountOptions' => $floorCountOptions,
    ]);
})->name('ilanlar');

Route::get('/ilanlar/{id}', function ($id) {
    $listing = \App\Models\Listing::with([
        'address.province',
        'address.district',
        'address.neighborhood',
        'user',
        'attributes.attribute.group',
        'attributes.option',
        'photos',
    ])->findOrFail($id);

    // Ungrouped Features (Group ID is null)
    $nonGroupedFeatures = $listing->attributes
        ->filter(fn ($a) => $a->attribute && $a->attribute->data_type === \App\Models\Attribute::TYPE_BOOLEAN && ! $a->attribute->attribute_group_id)
        ->map(fn ($a) => $a->attribute->name.': '.($a->value_bool ? 'Evet' : 'Hayır'))
        ->values()
        ->toArray();

    // Grouped Features (Group ID is not null)
    $groupedFeatures = $listing->attributes
        ->filter(function ($a) {
            if (! $a->attribute || ! $a->attribute->attribute_group_id) {
                return false;
            }
            if ($a->attribute->data_type === \App\Models\Attribute::TYPE_BOOLEAN) {
                return true;
            }
            if ($a->attribute->data_type === \App\Models\Attribute::TYPE_STRING) {
                return ! empty($a->value_string);
            }
            if ($a->attribute->data_type === \App\Models\Attribute::TYPE_INTEGER) {
                return ! is_null($a->value_int);
            }
            if ($a->attribute->data_type === \App\Models\Attribute::TYPE_SELECT) {
                return ! empty($a->attribute_option_id);
            }

            return false;
        })
        ->groupBy(fn ($a) => $a->attribute->group?->name ?? 'Diğer')
        ->map(fn ($group, $key) => [
            'group' => $key,
            'features' => $group->map(function ($a) {
                $value = match ($a->attribute->data_type) {
                    \App\Models\Attribute::TYPE_BOOLEAN => $a->value_bool ? 'Evet' : 'Hayır',
                    \App\Models\Attribute::TYPE_STRING => $a->value_string,
                    \App\Models\Attribute::TYPE_INTEGER => $a->value_int,
                    \App\Models\Attribute::TYPE_SELECT => $a->option?->value,
                    default => '-'
                };

                return $a->attribute->name.': '.$value;
            })->values()->toArray(),
        ])
        ->values()
        ->toArray();
    // Debugging: Uncomment to inspect
    // dd($groupedFeatures);

    // Helper to get attribute value
    $getAttrValue = function ($listing, $attrId) {
        $attr = $listing->attributes->first(fn ($a) => $a->attribute_id === $attrId);
        if (! $attr) {
            return null;
        }
        if ($attr->attribute->data_type === \App\Models\Attribute::TYPE_SELECT) {
            return $attr->option?->value;
        }
        if ($attr->attribute->data_type === \App\Models\Attribute::TYPE_BOOLEAN) {
            return $attr->value_bool ? 'Evet' : 'Hayır';
        }

        return $attr->value_string ?? $attr->value_int;
    };

    // Prepare Gallery Images
    $galleryImages = collect();
    // Add main photo
    if ($listing->main_photo_path) {
        $url = config('app.url')."/storage/listings/{$listing->id}/".$listing->main_photo_path;
        $galleryImages->push([
            'large' => $url,
            'thumb' => $url, // Ideally should have thumb version
            'alt' => $listing->title,
        ]);
    }
    // Add other photos
    foreach ($listing->photos as $photo) {
        $url = config('app.url')."/storage/listings/{$listing->id}/".$photo->photo_path;
        $galleryImages->push([
            'large' => $url,
            'thumb' => $url,
            'alt' => $listing->title,
        ]);
    }
    // Fallback if empty
    if ($galleryImages->isEmpty()) {
        $galleryImages->push([
            'large' => 'https://placehold.co/800x600?text=No+Image',
            'thumb' => 'https://placehold.co/200x150?text=No+Image',
            'alt' => 'No Image',
        ]);
    }

    // Prepare Details
    $detailItems = [
        ['label' => 'm² (Brüt)', 'value' => (string) ($getAttrValue($listing, 15) ?? $listing->area ?? '-')],
        ['label' => 'm² (Net)', 'value' => (string) ($getAttrValue($listing, 16) ?? $listing->net_area ?? '-')],
        ['label' => 'Oda Sayısı', 'value' => (string) ($getAttrValue($listing, 3) ?? '-')],
        ['label' => 'Kat Sayısı', 'value' => (string) ($getAttrValue($listing, 5) ?? '-')],
        ['label' => 'Bina Yaşı', 'value' => (string) ($getAttrValue($listing, 1) ?? '-')],
        ['label' => 'Bulunduğu Kat', 'value' => (string) ($getAttrValue($listing, 4) ?? '-')],
        ['label' => 'Isıtma', 'value' => (string) ($getAttrValue($listing, 7) ?? '-')], // Assuming ID 7 is Heating
    ];

    // Filter out null/dash values if desired, or keep them.

    // Append Ungrouped Features to Detail Items
    foreach ($nonGroupedFeatures as $feature) {
        $detailItems[] = ['label' => 'Özellik', 'value' => $feature];
    }

    // Prepare Agent Profile
    $agentProfile = [
        'name' => $listing->user ? $listing->user->name.' '.$listing->user->surname : 'Silinmiş Üye',
        'role' => 'Gayrimenkul Danışmanı', // Could be dynamic
        'avatarUrl' => $listing->user && $listing->user->profile_photo_path
            ? config('app.url').'/storage/'.$listing->user->profile_photo_path
            : 'https://placehold.co/100x100?text=Agent',
        'phone' => $listing->user?->phone_number ?? '-',
        'email' => $listing->user?->email ?? '-',
    ];

    // Breadcrumbs
    $breadcrumbs = [
        ['label' => 'İlanlar', 'href' => route('ilanlar')],
        ['label' => $listing->address?->province?->name ?? 'İl'],
        ['label' => $listing->address?->district?->name ?? 'İlçe'],
        ['label' => \Illuminate\Support\Str::limit($listing->title, 30)],
    ];

    // Features logic moved up

    return Inertia::render('ilanlar-detay', [
        'listing' => [
            'id' => $listing->id,
            'title' => $listing->title,
            'description' => $listing->description,
            'price' => number_format($listing->price, 0, ',', '.').' TL',
            'date' => optional($listing->created_at)->translatedFormat('d F Y') ?? '-',
            'location' => ($listing->address?->district?->name ?? '').' / '.($listing->address?->province?->name ?? ''),
            'fullLocation' => ($listing->address?->neighborhood?->name ?? '').', '.($listing->address?->district?->name ?? '').', '.($listing->address?->province?->name ?? ''),
            'features' => $groupedFeatures,
            'nonGroupedFeatures' => $nonGroupedFeatures,
            'neighborhood' => $listing->address?->neighborhood?->name,
            'district' => $listing->address?->district?->name,
            'city' => $listing->address?->province?->name,
        ],
        'galleryImages' => $galleryImages,
        'detailItems' => $detailItems,
        'agentProfile' => $agentProfile,
        'breadcrumbs' => $breadcrumbs,
        // Passing placeholders for sections not yet fully dynamic
        'similarListings' => [],
        'locationInfo' => [ // This could be dynamic if we had POI data
            ['label' => 'İl', 'value' => $listing->address?->province?->name ?? '-'],
            ['label' => 'İlçe', 'value' => $listing->address?->district?->name ?? '-'],
            ['label' => 'Mahalle', 'value' => $listing->address?->neighborhood?->name ?? '-'],
        ],
    ]);
})->name('ilanlar.show');

Route::get('/admin/login', function (Request $request) {
    $user = $request->user();

    if ($user) {
        if ($user->isAdmin()) {
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
                    'date' => optional($user->created_at)->format('d.m.Y') ?? '-',
                ]);

            $listings = \App\Models\Listing::where('listing_status', 'pending')
                ->with('user')
                ->orderByDesc('created_at')
                ->take(5)
                ->get()
                ->map(fn ($listing) => [
                    'id' => $listing->id,
                    'title' => $listing->title,
                    'price' => number_format($listing->price, 0, ',', '.').' ₺',
                    'location' => $listing->district.'/'.$listing->city,
                    'owner' => $listing->user ? $listing->user->name.' '.$listing->user->surname : 'Silinmiş Üye',
                    'date' => optional($listing->created_at)->format('d.m.Y') ?? '-',
                ]);

            $activities = \Spatie\Activitylog\Models\Activity::with(['causer', 'subject'])
                ->orderByDesc('created_at')
                ->take(10)
                ->get()
                ->map(fn ($activity) => [
                    'id' => $activity->id,
                    'description' => $activity->description,
                    'subject_type' => class_basename($activity->subject_type),
                    'subject_id' => $activity->subject_id,
                    'subject_name' => match (class_basename($activity->subject_type)) {
                        'User' => $activity->subject?->name.' '.$activity->subject?->surname,
                        'Office', 'ContactMessage', 'BoardMember', 'SupervisoryBoardMember', 'ChamberTeam', 'RegionalManager' => $activity->subject?->name,
                        'Faq' => $activity->subject?->question,
                        'BankAccount' => $activity->subject?->bank_name,
                        'RegistrationFee' => $activity->subject?->category,
                        'WhyChooseUs' => 'Neden Emlak Ofisi',
                        'AboutIzeko' => 'izeko.org.tr Nedir?',
                        'ChamberRegistration' => 'Oda Kayıt İşlemleri',
                        'ChairmanMessage' => 'Yönetim Kurulu Başkanımız',
                        default => $activity->subject?->title ?? 'Silinmiş Kayıt',
                    },
                    'causer_name' => trim($activity->causer ? $activity->causer->name.' '.$activity->causer->surname : 'Sistem'),
                    'created_at' => $activity->created_at->diffForHumans(),
                    'properties' => $activity->properties,
                    'event' => $activity->event,
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
                    'offices' => \App\Models\Office::count(),
                ],
                'recentUsers' => $users,
                'recentListings' => $listings,
                'activityLogs' => $activities,
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

        Route::patch('ilanlar/{listing}/status', [ListingController::class, 'updateStatus'])
            ->name('ilanlar.status');

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

        Route::get('bildirimler/push', [\App\Http\Controllers\Admin\NotificationController::class, 'pushIndex'])
            ->name('notifications.push.index'); // Fixed name to match pattern
        Route::get('bildirimler/push/yeni', [\App\Http\Controllers\Admin\NotificationController::class, 'pushCreate'])
            ->name('notifications.push.create');
        Route::post('bildirimler/push', [\App\Http\Controllers\Admin\NotificationController::class, 'pushStore'])
            ->name('notifications.push.store');
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

        Route::patch('chamber-teams/reorder', [\App\Http\Controllers\Admin\ChamberTeamController::class, 'reorder'])
            ->name('chamber-teams.reorder');
        Route::resource('chamber-teams', \App\Http\Controllers\Admin\ChamberTeamController::class)
            ->parameters(['chamber-teams' => 'chamberTeam']);

        // Location Routes
        Route::get('/locations/provinces/{province}/districts', [\App\Http\Controllers\Admin\LocationController::class, 'getDistricts'])->name('locations.districts');
        Route::get('/locations/districts/{district}/neighborhoods', [\App\Http\Controllers\Admin\LocationController::class, 'getNeighborhoods'])->name('locations.neighborhoods');

        // Why Choose Us
        Route::get('why-choose-us/edit', [\App\Http\Controllers\Admin\WhyChooseUsController::class, 'edit'])->name('why-choose-us.edit');
        Route::post('why-choose-us/update', [\App\Http\Controllers\Admin\WhyChooseUsController::class, 'update'])->name('why-choose-us.update');

        // About Izeko
        Route::get('about-izeko/edit', [\App\Http\Controllers\Admin\AboutIzekoController::class, 'edit'])->name('about-izeko.edit');
        Route::post('about-izeko/update', [\App\Http\Controllers\Admin\AboutIzekoController::class, 'update'])->name('about-izeko.update');

        // Chamber Registration
        Route::get('chamber-registration/edit', [\App\Http\Controllers\Admin\ChamberRegistrationController::class, 'edit'])->name('chamber-registration.edit');
        Route::post('chamber-registration/update', [\App\Http\Controllers\Admin\ChamberRegistrationController::class, 'update'])->name('chamber-registration.update');
        Route::get('/api/activities', function (Request $request) {
            $offset = (int) $request->query('offset', 10);
            $limit = (int) $request->query('limit', 10);

            \Illuminate\Support\Facades\Log::info("Activity API Request: Offset=$offset, Limit=$limit");

            $activities = \Spatie\Activitylog\Models\Activity::with(['causer', 'subject'])
                ->orderByDesc('created_at')
                ->skip($offset)
                ->take($limit)
                ->get()
                ->map(fn ($activity) => [
                    'id' => $activity->id,
                    'description' => $activity->description,
                    'subject_type' => class_basename($activity->subject_type),
                    'subject_id' => $activity->subject_id,
                    'subject_name' => match (class_basename($activity->subject_type)) {
                        'User' => $activity->subject?->name.' '.$activity->subject?->surname,
                        'Office', 'ContactMessage', 'BoardMember', 'SupervisoryBoardMember', 'ChamberTeam', 'RegionalManager' => $activity->subject?->name,
                        'Faq' => $activity->subject?->question,
                        'BankAccount' => $activity->subject?->bank_name,
                        'RegistrationFee' => $activity->subject?->category,
                        'WhyChooseUs' => 'Neden Emlak Ofisi',
                        'AboutIzeko' => 'izeko.org.tr Nedir?',
                        'ChamberRegistration' => 'Oda Kayıt İşlemleri',
                        'ChairmanMessage' => 'Yönetim Kurulu Başkanımız',
                        default => $activity->subject?->title ?? 'Silinmiş Kayıt',
                    },
                    'causer_name' => trim($activity->causer ? $activity->causer->name.' '.$activity->causer->surname : 'Sistem'),
                    'created_at' => $activity->created_at->diffForHumans(),
                    'properties' => $activity->properties,
                    'event' => $activity->event,
                ])
                ->values();

            return response()->json([
                'activities' => $activities,
                'hasMore' => $activities->count() === $limit,
            ]);
        })->name('api.activities');
    },
);

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::get('/test', function () {
    return 'testa';
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
