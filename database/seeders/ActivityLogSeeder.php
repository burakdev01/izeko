<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\Office;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Activitylog\Models\Activity;

class ActivityLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Activity::truncate();

        $users = User::all();
        $offices = Office::all();
        $listings = Listing::all();
        $admin = User::where('is_admin', true)->first() ?? $users->first();

        // Seed logs for Users
        for ($i = 0; $i < 50; $i++) {
            $user = $users->random();
            activity()
                ->useLog('users')
                ->performedOn($user)
                ->causedBy($admin)
                ->event('created')
                ->log('created');

            if ($user->status === 'active') { // 50% chance of update if we random boolean, or just keep logic
                 activity()
                    ->useLog('users')
                    ->performedOn($user)
                    ->causedBy($admin)
                    ->event('updated')
                    ->withProperties([
                        'attributes' => ['status' => 'active'],
                        'old' => ['status' => 'pending']
                    ])
                    ->log('updated');
            }
        }

        // Seed logs for Offices
        for ($i = 0; $i < 50; $i++) {
            $office = $offices->random();
            activity()
                ->useLog('offices')
                ->performedOn($office)
                ->causedBy($admin)
                ->event('created')
                ->log('created');
            
            // Randomly create an update log
            if (rand(0, 1)) {
                activity()
                    ->useLog('offices')
                    ->performedOn($office)
                    ->causedBy($admin)
                    ->event('updated')
                    ->withProperties([
                        'attributes' => ['status' => 'active'],
                        'old' => ['status' => 'pending']
                    ])
                    ->log('updated');
            }
        }

        // Seed logs for Listings
        for ($i = 0; $i < 50; $i++) {
            $listing = $listings->random();
            $owner = $users->find($listing->user_id) ?? $users->random();
            
            activity()
                ->useLog('listings')
                ->performedOn($listing)
                ->causedBy($owner)
                ->event('created')
                ->log('created');

            // Randomly create an update log
            if (rand(0, 1)) {
                 activity()
                    ->useLog('listings')
                    ->performedOn($listing)
                    ->causedBy($admin)
                    ->event('updated')
                    ->withProperties([
                        'attributes' => ['listing_status' => 'active'],
                        'old' => ['listing_status' => 'pending']
                    ])
                    ->log('updated');
            }
        }
    }
}
