<?php

test('navbar crm link points to crm route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/navbar/Navbar.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('href="/crm"');
    expect($contents)->toContain('Oda CRM Giriş');
});

test('footer haberler link points to haberler route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/footer/Footer.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('text="Haberler"');
    expect($contents)->toContain('href="/haberler"');
});

test('footer blog and makale link points to haberler route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/footer/Footer.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('text="Blog & Makale"');
    expect($contents)->toContain('href="/haberler"');
});

test('footer iletisim link points to iletisim route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/footer/Footer.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('text="İletişim"');
    expect($contents)->toContain('href="/iletisim"');
});

test('footer kullanim kosullari link points to kullanim kosullari route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/footer/Footer.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('text="Kullanım Koşulları"');
    expect($contents)->toContain('href="/kullanim-kosullari"');
});

test('footer hukuki sartlar link points to hukuki sartlar route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/footer/Footer.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('text="Hukuki Şartlar"');
    expect($contents)->toContain('href="/hukuki-sartlar"');
});

test('footer gizlilik sozlesmesi link points to gizlilik sozlesmesi route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/footer/Footer.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('text="Gizlilik Sözleşmesi"');
    expect($contents)->toContain('href="/gizlilik-sozlesmesi"');
});

test('footer sss link points to sss route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/footer/Footer.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('text="SSS"');
    expect($contents)->toContain('href="/sss"');
});

test('footer mevzuat link points to duyurular route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/footer/Footer.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('text="Mevzuat"');
    expect($contents)->toContain('href="/duyurular"');
});

test('footer anasayfa link points to home route', function () {
    $contents = file_get_contents(
        base_path('resources/js/components/footer/Footer.tsx'),
    );

    expect($contents)->not->toBeFalse();
    expect($contents)->toContain('text="Anasayfa"');
    expect($contents)->toContain('href="/"');
});

test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
