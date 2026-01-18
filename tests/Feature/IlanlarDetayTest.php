<?php

use Inertia\Testing\AssertableInertia as Assert;

test('ilan detayi sayfasi render edilir', function () {
    $response = $this->get(route('ilanlar.show', ['slug' => 'ornek-ilan']));

    $response->assertSuccessful();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('ilanlar-detay')
    );
});
