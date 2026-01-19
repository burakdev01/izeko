<?php

use Inertia\Testing\AssertableInertia as Assert;

test('hukuki sartlar sayfasi render edilir', function () {
    $response = $this->get(route('hukuki-sartlar'));

    $response->assertSuccessful();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('hukuki-sartlar')
    );
});
