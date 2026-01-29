<?php

use App\Models\Announcement;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view announcements index', function () {
    $admin = createAdminUser();

    Announcement::factory()->create();

    $this->actingAs($admin)
        ->get(route('admin.duyurular.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/duyurular/index')
            ->has('announcements', 1)
        );
});

test('admin can create announcement without subtitle or excerpt', function () {
    $admin = createAdminUser();

    $this->actingAs($admin)
        ->post(route('admin.duyurular.store'), [
            'title' => 'Duyuru Basligi',
            'content' => 'Duyuru icerigi',
            'image' => 'https://example.com/duyuru.jpg',
            'active' => true,
        ])
        ->assertRedirect(route('admin.duyurular.index'))
        ->assertSessionHasNoErrors();

    $announcement = Announcement::query()->first();

    expect($announcement)->not->toBeNull();
    expect($announcement?->title)->toBe('Duyuru Basligi');
    expect($announcement?->content)->toBe('Duyuru icerigi');
});

test('admin uploads announcement image to uploads disk', function () {
    Storage::fake('uploads');

    $admin = createAdminUser();

    $file = UploadedFile::fake()->image('duyuru.jpg', 1200, 900);
    $webpName = pathinfo($file->hashName(), PATHINFO_FILENAME).'.webp';

    $this->actingAs($admin)
        ->post(route('admin.duyurular.store'), [
            'title' => 'Duyuru Basligi',
            'content' => 'Duyuru icerigi',
            'image_file' => $file,
            'active' => true,
        ])
        ->assertRedirect(route('admin.duyurular.index'))
        ->assertSessionHasNoErrors();

    $announcement = Announcement::query()->first();

    expect($announcement)->not->toBeNull();
    Storage::disk('uploads')->assertExists('announcements/'.$webpName);
    expect($announcement?->image)->toBe($webpName);
});

test('admin announcement edit payload excludes subtitle and excerpt', function () {
    $admin = createAdminUser();

    $announcement = Announcement::factory()->create();

    $this->actingAs($admin)
        ->get(route('admin.duyurular.edit', $announcement))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/duyurular/edit')
            ->has('announcement', 12)
            ->missing('announcement.subtitle')
            ->missing('announcement.excerpt')
        );
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
