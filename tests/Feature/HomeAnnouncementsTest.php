<?php

use App\Models\Announcement;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('home page includes active announcements', function () {
    $first = Announcement::factory()->create([
        'sort_order' => 1,
        'updated_at' => now()->subDays(3),
        'created_at' => now()->subDays(3),
        'link' => 'https://example.com/duyuru-1',
    ]);
    $second = Announcement::factory()->create([
        'sort_order' => 2,
        'updated_at' => now()->subDays(2),
        'created_at' => now()->subDays(2),
    ]);
    $third = Announcement::factory()->create([
        'sort_order' => 3,
        'updated_at' => now()->subDay(),
        'created_at' => now()->subDay(),
    ]);

    Announcement::factory()->create([
        'sort_order' => 4,
    ]);

    Announcement::factory()->create([
        'active' => false,
        'sort_order' => 0,
    ]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('announcements', 3)
            ->where('announcements.0.id', $first->id)
            ->where('announcements.0.title', $first->title)
            ->where('announcements.0.image', $first->image)
            ->where('announcements.0.link', $first->link)
            ->where(
                'announcements.0.detail_url',
                '/duyurular/'.Str::slug($first->title),
            )
            ->where(
                'announcements.0.date',
                $first->updated_at->format('Y-m-d'),
            )
            ->where('announcements.1.id', $second->id)
            ->where(
                'announcements.1.date',
                $second->updated_at->format('Y-m-d'),
            )
            ->where('announcements.2.id', $third->id)
            ->where(
                'announcements.2.date',
                $third->updated_at->format('Y-m-d'),
            )
        );
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
