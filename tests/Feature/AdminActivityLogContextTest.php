<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Activitylog\Models\Activity;

uses(RefreshDatabase::class);

it('adds ip and user agent to admin activity logs', function () {
    $admin = createAdminUser();

    $this->actingAs($admin)
        ->withServerVariables(['REMOTE_ADDR' => '203.0.113.10'])
        ->withHeader('User-Agent', 'PestTestAgent')
        ->post(route('admin.haberler.store'), [
            'title' => 'Test Post',
            'content' => 'Test content',
            'image' => 'https://example.test/image.jpg',
            'active' => '1',
        ])
        ->assertRedirect(route('admin.haberler.index'));

    $activity = Activity::query()
        ->where('log_name', 'blog_posts')
        ->latest()
        ->first();

    expect($activity)->not->toBeNull();
    expect($activity->properties->get('ip'))->toBe('203.0.113.10');
    expect($activity->properties->get('user_agent'))->toBe('PestTestAgent');
});
