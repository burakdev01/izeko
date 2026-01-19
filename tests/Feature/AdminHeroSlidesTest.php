<?php

use App\Models\HeroSlide;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('admin can view hero slides index', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    HeroSlide::create([
        'title' => 'Test Slide',
        'subtitle' => 'Alt Başlık',
        'image' => 'https://example.test/slide.jpg',
        'sort_order' => 1,
    ]);

    $this->actingAs($admin)
        ->get(route('admin.hero-slides.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/hero-slides/index')
            ->has('slides', 1)
        );
});

test('admin can view hero slides create page', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin)
        ->get(route('admin.hero-slides.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/hero-slides/create')
        );
});

test('admin can view hero slides edit page', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $slide = HeroSlide::create([
        'title' => 'Düzenleme Slaytı',
        'image' => 'https://example.test/slide-edit.jpg',
        'sort_order' => 2,
    ]);

    $this->actingAs($admin)
        ->get(route('admin.hero-slides.edit', $slide))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/hero-slides/edit')
            ->where('slide.id', $slide->id)
        );
});

test('admin can remove hero slide image', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $slide = HeroSlide::create([
        'title' => 'Silinecek Görsel',
        'image' => 'ornek.jpg',
        'video' => 'ornek.mp4',
        'sort_order' => 1,
    ]);

    $this->actingAs($admin)
        ->put(route('admin.hero-slides.update', $slide), [
            'title' => 'Silinecek Görsel',
            'remove_image' => true,
        ])
        ->assertRedirect(route('admin.hero-slides.index'));

    expect($slide->refresh()->image)->toBeNull();
});

test('admin can store hero slides with uploads', function () {
    Storage::fake('uploads');
    config([
        'filesystems.disks.uploads.url' => config('app.url').'/uploads',
    ]);

    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin)
        ->post(route('admin.hero-slides.store'), [
            'title' => 'Yeni Slayt',
            'subtitle' => 'Alt başlık',
            'image_file' => UploadedFile::fake()->image('slide.jpg'),
        ])
        ->assertRedirect(route('admin.hero-slides.index'));

    $slide = HeroSlide::query()->first();

    expect($slide)->not->toBeNull();
    expect($slide?->image)->not->toBeNull();
    expect($slide?->image)->not->toContain('/');
    expect($slide?->image)->not->toContain('http');
    expect($slide?->image)->toEndWith('.webp');

    Storage::disk('uploads')->assertExists('hero-slides/'.$slide?->image);
});

test('admin can store hero slides with video only', function () {
    Storage::fake('uploads');
    config([
        'filesystems.disks.uploads.url' => config('app.url').'/uploads',
    ]);

    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin)
        ->post(route('admin.hero-slides.store'), [
            'title' => 'Video Slayt',
            'video_file' => UploadedFile::fake()->create(
                'slide.mp4',
                1024,
                'video/mp4',
            ),
        ])
        ->assertRedirect(route('admin.hero-slides.index'))
        ->assertSessionHasNoErrors();

    $slide = HeroSlide::query()->first();

    expect($slide)->not->toBeNull();
    expect($slide?->video)->not->toBeNull();
    expect($slide?->image)->toBeNull();
});

test('admin can reorder hero slides', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $first = HeroSlide::create([
        'title' => 'Birinci Slayt',
        'image' => 'https://example.test/slide-1.jpg',
        'sort_order' => 1,
    ]);

    $second = HeroSlide::create([
        'title' => 'İkinci Slayt',
        'image' => 'https://example.test/slide-2.jpg',
        'sort_order' => 2,
    ]);

    $this->actingAs($admin)
        ->patch(route('admin.hero-slides.reorder'), [
            'order' => [$second->id, $first->id],
        ])
        ->assertRedirect(route('admin.hero-slides.index'));

    $this->assertDatabaseHas('hero_slides', [
        'id' => $second->id,
        'sort_order' => 1,
    ]);

    $this->assertDatabaseHas('hero_slides', [
        'id' => $first->id,
        'sort_order' => 2,
    ]);
});
