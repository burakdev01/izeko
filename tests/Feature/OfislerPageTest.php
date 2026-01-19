<?php

use Inertia\Testing\AssertableInertia as Assert;

test('ofisler sayfasi render edilir', function () {
    $response = $this->get(route('ofisler'));

    $response->assertSuccessful();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('ofisler')
    );
});
