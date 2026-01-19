<?php

use App\Models\Faq;
use Inertia\Testing\AssertableInertia as Assert;

test('sss sayfasi aktif sorulari listeler', function () {
    Faq::factory()->count(2)->create();
    Faq::factory()->inactive()->create();

    $response = $this->get(route('sss'));

    $response->assertSuccessful();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('sss')
        ->has('faqItems', 2)
    );
});
