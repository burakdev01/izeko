<?php

test('mevzuat linki duyurular sayfasina yonlendirir', function () {
    $response = $this->get(route('mevzuat'));

    $response->assertRedirect(route('duyurular'));
});
