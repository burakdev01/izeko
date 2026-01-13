<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home'); 
})->name('home');

Route::get('/kurumsal/yonetim-kurulu-baskanimiz', function () {
    return Inertia::render('kurumsal/yonetim-kurulu-baskanimiz');
})->name('kurumsal.yonetim-kurulu-baskanimiz');


// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

require __DIR__.'/settings.php';
