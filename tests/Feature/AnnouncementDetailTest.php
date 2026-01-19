<?php

use App\Models\Announcement;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('announcement detail page renders', function () {
    $announcement = Announcement::factory()->create([
        'title' => 'Duyuru Basligi',
        'subtitle' => 'Alt baslik',
        'excerpt' => 'Kisa ozet',
        'content' => 'Detayli icerik',
        'link' => 'https://example.com/duyuru',
    ]);

    $slug = Str::slug($announcement->title);

    $this->get(route('duyurular.show', ['slug' => $slug]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('duyurular-detay')
            ->where('announcement.id', $announcement->id)
            ->where('announcement.title', $announcement->title)
            ->where('announcement.content', $announcement->content)
            ->where('announcement.link', $announcement->link)
            ->where('announcement.slug', $slug)
        );
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
