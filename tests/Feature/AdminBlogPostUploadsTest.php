<?php

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('admin blog uploads store image as webp in uploads blogs directory', function () {
    Storage::fake('uploads');
    config([
        'filesystems.disks.uploads.url' => config('app.url').'/uploads',
    ]);

    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $response = $this->actingAs($admin)->post(route('admin.haberler.store'), [
        'title' => 'Yeni Haber',
        'content' => 'Icerik burada.',
        'image_file' => UploadedFile::fake()->image('kapak.jpg'),
        'active' => true,
    ]);

    $response
        ->assertRedirect(route('admin.haberler.index'))
        ->assertSessionHasNoErrors();

    $post = BlogPost::query()->first();

    expect($post)->not->toBeNull();
    expect($post?->image)->toContain('/uploads/blogs/');

    $path = parse_url((string) $post?->image, PHP_URL_PATH);
    $fileName = $path ? basename($path) : null;

    expect($fileName)->not->toBeNull();
    expect($fileName)->toEndWith('.webp');

    Storage::disk('uploads')->assertExists('blogs/'.$fileName);
});

test('admin can remove blog post image', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $post = BlogPost::factory()->create([
        'image' => 'https://example.test/uploads/blogs/ornek.webp',
    ]);

    $this->actingAs($admin)
        ->put(route('admin.haberler.update', $post), [
            'title' => $post->title,
            'content' => $post->content,
            'remove_image' => true,
        ])
        ->assertRedirect(route('admin.haberler.index'));

    expect($post->refresh()->image)->toBe('');
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
