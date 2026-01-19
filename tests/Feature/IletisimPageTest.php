<?php

use Inertia\Testing\AssertableInertia as Assert;

test('iletisim sayfasi render edilir', function () {
    $response = $this->get(route('iletisim'));

    $response->assertSuccessful();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('iletisim')
    );
});
