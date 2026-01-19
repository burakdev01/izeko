<?php

use Inertia\Testing\AssertableInertia as Assert;

test('gizlilik sozlesmesi sayfasi render edilir', function () {
    $response = $this->get(route('gizlilik-sozlesmesi'));

    $response->assertSuccessful();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('gizlilik-sozlesmesi')
    );
});
