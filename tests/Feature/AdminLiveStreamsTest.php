<?php

use App\Models\LiveStream;

test('admin can create live stream without thumbnail', function () {
    $admin = createAdminUser();

    $this->actingAs($admin)
        ->post(route('admin.canli-yayinlar.store'), [
            'title' => 'Canli Yayin',
            'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'active' => true,
        ])
        ->assertRedirect(route('admin.canli-yayinlar.index'))
        ->assertSessionHasNoErrors();

    $stream = LiveStream::query()->first();

    expect($stream)->not->toBeNull();
    expect($stream?->thumbnail)->toBe('');
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
