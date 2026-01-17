<?php

namespace App\Models\Concerns;

use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

trait LogsAdminRequestContext
{
    public function tapActivity(Activity $activity, string $eventName): void
    {
        if (! Auth::check() || ! Auth::user()?->is_admin) {
            return;
        }

        $request = request();

        if (! $request->routeIs('admin.*')) {
            return;
        }

        $activity->properties = $activity->properties->merge([
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);
    }
}
