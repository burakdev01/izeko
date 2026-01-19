<?php

test('navbar crm link points to crm route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/navbar/Navbar.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('href="/crm"');
    expect($contents)->toContain('Oda CRM Giriş');
});
test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
