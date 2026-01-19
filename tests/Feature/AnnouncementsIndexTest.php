<?php

use App\Models\Announcement;
use App\Models\BlogPost;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('duyurular page includes announcement detail url', function () {
    $announcement = Announcement::factory()->create([
        'title' => 'Ornek Duyuru',
    ]);

    $slug = Str::slug($announcement->title);

    $this->get(route('duyurular'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('duyurular')
            ->has('announcements', 1)
            ->where('announcements.0.detail_url', '/duyurular/'.$slug)
        );
});

test('duyurular page shares article sidebar data', function () {
    Announcement::factory()->create([
        'title' => 'Ornek Duyuru',
    ]);
    BlogPost::factory()->create([
        'title' => 'Ornek Haber',
    ]);

    $this->get(route('duyurular'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('duyurular')
            ->has('articleSidebar.announcements', 1)
            ->has('articleSidebar.news', 1)
        );
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
