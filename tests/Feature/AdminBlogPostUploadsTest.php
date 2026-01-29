<?php

use App\Models\BlogPost;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('admin blog uploads store image as webp in uploads blogs directory', function () {
    Storage::fake('uploads');
    config([
        'filesystems.disks.uploads.url' => config('app.url').'/uploads',
    ]);

    $admin = createAdminUser();

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
    expect($post?->image)->not->toBeNull();
    expect($post?->image)->toEndWith('.webp');

    Storage::disk('uploads')->assertExists('blogs/'.$post?->image);
});

test('admin can remove blog post image', function () {
    $admin = createAdminUser();

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
