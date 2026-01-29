<?php

use App\Models\Listing;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

it('adds listing_type column to listings table', function () {
    expect(Schema::hasColumn('listings', 'listing_type'))->toBeTrue();
});

it('stores listing_type as 0 or 1', function () {
    $user = User::query()->create([
        'name' => 'Test',
        'email' => 'test@example.com',
        'password' => Hash::make('password'),
    ]);

    $listing = Listing::factory()->create([
        'user_id' => $user->id,
        'listing_type' => 1,
    ]);

    expect($listing->listing_type)->toBe(1);
});
