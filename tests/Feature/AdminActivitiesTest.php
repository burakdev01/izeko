<?php

use App\Models\Activity;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can store activity with youtube url and saves video id', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    $this->actingAs($admin)
        ->post(route('admin.faaliyetler.store'), [
            'title' => 'Yeni Faaliyet',
            'video_url' => $youtubeUrl,
            'active' => true,
        ])
        ->assertRedirect(route('admin.faaliyetler.index'))
        ->assertSessionHasNoErrors();

    $activity = Activity::query()->first();

    expect($activity)->not->toBeNull();
    expect($activity?->video_url)->toBe('dQw4w9WgXcQ');
    expect($activity?->thumbnail)->toBe(
        'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    );
});

test('admin edit form shows youtube url', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $activity = Activity::factory()->create([
        'video_url' => 'dQw4w9WgXcQ',
    ]);

    $this->actingAs($admin)
        ->get(route('admin.faaliyetler.edit', $activity))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/faaliyetler/edit')
            ->where(
                'activity.video_url',
                'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            )
        );
});

test('admin can update activity and stores youtube id', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $activity = Activity::factory()->create([
        'video_url' => 'dQw4w9WgXcQ',
        'thumbnail' => 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    ]);

    $this->actingAs($admin)
        ->put(route('admin.faaliyetler.update', $activity), [
            'title' => $activity->title,
            'video_url' => 'https://youtu.be/9bZkp7q19f0',
            'active' => true,
        ])
        ->assertRedirect(route('admin.faaliyetler.index'))
        ->assertSessionHasNoErrors();

    $activity->refresh();

    expect($activity->video_url)->toBe('9bZkp7q19f0');
    expect($activity->thumbnail)->toBe(
        'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg',
    );
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
