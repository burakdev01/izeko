<?php

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('soft deletes blog posts from the admin panel', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $post = BlogPost::create([
        'title' => 'Test Post',
        'content' => 'Test content',
        'image' => 'https://example.test/image.jpg',
        'active' => true,
    ]);

    $this->actingAs($admin)
        ->delete(route('admin.haberler.destroy', $post))
        ->assertRedirect(route('admin.haberler.index'));

    $this->assertSoftDeleted('blog_posts', [
        'id' => $post->id,
    ]);
});
