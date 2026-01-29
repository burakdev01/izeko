<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Auth;

class LogSuccessfulLogin
{
    public function handle(Login $event): void
    {
        $user = $event->user;

        if (! $user || ! $user->isAdmin()) {
            return;
        }

        if (Auth::viaRemember()) {
            return;
        }

        $request = request();

        activity('auth')
            ->causedBy($user)
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'guard' => $event->guard,
            ])
            ->log('Admin giriş yaptı ('.$request->ip().')');
    }
}
