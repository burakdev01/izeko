<?php

use App\Models\LiveStream;
use Inertia\Testing\AssertableInertia as Assert;

test('canli yayinlar page lists streams', function () {
    LiveStream::factory()->create();

    $this->get(route('canli-yayinlar'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('canli-yayinlar')
            ->has('streams', 1)
        );
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
