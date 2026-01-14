<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home'); 
})->name('home');

Route::get('/kurumsal/yonetim-kurulu-baskanimiz', function () {
    return Inertia::render('kurumsal/yonetim-kurulu-baskanimiz');
})->name('kurumsal.yonetim-kurulu-baskanimiz');

Route::get('/kurumsal/yonetim-kurulu', function () {
    return Inertia::render('kurumsal/yonetim-kurulu');
})->name('kurumsal.yonetim-kurulu');

Route::get('/kurumsal/denetim-kurulu', function () {
    return Inertia::render('kurumsal/denetim-kurulu');
})->name('kurumsal.denetim-kurulu');

Route::get('/kurumsal/oda-ekibimiz', function () {
    return Inertia::render('kurumsal/oda-ekibimiz');
})->name('kurumsal.oda-ekibimiz');

Route::get('/kurumsal/bolge-sorumlularimiz', function () {
    return Inertia::render('kurumsal/bolge-sorumlularimiz');
})->name('kurumsal.bolge-sorumlularimiz');

Route::get('/kurumsal/oda-hesap-numaralari', function () {
    return Inertia::render('kurumsal/oda-hesap-numaralari');
})->name('kurumsal.oda-hesap-numaralari');

Route::get('/kurumsal/kayit-ucretleri', function () {
    return Inertia::render('kurumsal/kayit-ucretleri');
})->name('kurumsal.kayit-ucretleri');

Route::get('/kurumsal/neden-emlak-ofisi', function () {
    return Inertia::render('kurumsal/neden-emlak-ofisi');
})->name('kurumsal.neden-emlak-ofisi');

Route::get('/kurumsal/izeko-nedir', function () {
    return Inertia::render('kurumsal/izeko-nedir');
})->name('kurumsal.izeko-nedir');

Route::get('/kurumsal/oda-kayit-islemleri', function () {
    return Inertia::render('kurumsal/oda-kayit-islemleri');
})->name('kurumsal.oda-kayit-islemleri');

Route::get('/faaliyetler', function () {
    return Inertia::render('faaliyetler');
})->name('faaliyetler');

Route::get('/haberler', function () {
    return Inertia::render('haberler');
})->name('haberler');

Route::get('/canli-yayinlar', function () {
    return Inertia::render('canli-yayinlar');
})->name('canli-yayinlar');

Route::get('/duyurular', function () {
    return Inertia::render('duyurular');
})->name('duyurular');

Route::get('/ilanlar', function () {
    return Inertia::render('ilanlar');
})->name('ilanlar');




// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

require __DIR__.'/settings.php';
