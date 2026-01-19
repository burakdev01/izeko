<?php

use App\Models\Activity;
use Inertia\Testing\AssertableInertia as Assert;

test('faaliyetler page lists activities', function () {
    Activity::factory()->create();

    $this->get(route('faaliyetler'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('faaliyetler')
            ->has('activities', 1)
        );
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
