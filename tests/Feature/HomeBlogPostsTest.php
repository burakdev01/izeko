<?php

use App\Models\BlogPost;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('home page renders', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('quickAccessItems', 6)
            ->has('faqItems', 4)
        );
});

test('home page includes active blog posts', function () {
    $first = BlogPost::factory()->create([
        'title' => 'Ilk Yazi',
        'seo_url' => 'ilk-yazi',
        'sort_order' => 1,
        'updated_at' => now()->subDays(3),
        'created_at' => now()->subDays(3),
    ]);
    $second = BlogPost::factory()->create([
        'title' => 'Ikinci Yazi',
        'seo_url' => null,
        'sort_order' => 2,
        'updated_at' => now()->subDays(2),
        'created_at' => now()->subDays(2),
    ]);
    $third = BlogPost::factory()->create([
        'title' => 'Ucuncu Yazi',
        'seo_url' => 'ucuncu-yazi',
        'sort_order' => 3,
        'updated_at' => now()->subDay(),
        'created_at' => now()->subDay(),
    ]);
    $fourth = BlogPost::factory()->create([
        'title' => 'Dorduncu Yazi',
        'seo_url' => 'dorduncu-yazi',
        'sort_order' => 4,
    ]);

    BlogPost::factory()->inactive()->create([
        'title' => 'Pasif Yazi',
        'seo_url' => 'pasif-yazi',
        'sort_order' => 0,
    ]);

    $response = $this->get(route('home'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('blogPosts', 3)
            ->where('blogPosts.0.id', $first->id)
            ->where('blogPosts.0.title', $first->title)
            ->where('blogPosts.0.slug', $first->seo_url)
            ->where('blogPosts.0.date', $first->updated_at->format('Y-m-d'))
            ->where('blogPosts.1.id', $second->id)
            ->where('blogPosts.1.slug', Str::slug($second->title))
            ->where('blogPosts.1.date', $second->updated_at->format('Y-m-d'))
            ->where('blogPosts.2.id', $third->id)
            ->where('blogPosts.2.slug', $third->seo_url)
            ->where('blogPosts.2.date', $third->updated_at->format('Y-m-d'))
        );
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
