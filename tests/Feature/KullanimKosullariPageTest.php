<?php

use Inertia\Testing\AssertableInertia as Assert;

test('kullanim kosullari sayfasi render edilir', function () {
    $response = $this->get(route('kullanim-kosullari'));

    $response->assertSuccessful();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('kullanim-kosullari')
    );
});
