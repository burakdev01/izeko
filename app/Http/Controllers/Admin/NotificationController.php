<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Office;
use App\Models\User;

class NotificationController extends Controller
{
    public function emailIndex()
    {
        return Inertia::render('admin/notifications/email/index');
    }

    public function emailCreate()
    {
        return Inertia::render('admin/notifications/email/create', [
            'users' => User::select('id', 'name', 'email')->get(),
            'offices' => Office::select('id', 'name')->get(), // Assuming offices have email or use owner's email
        ]);
    }

    public function emailStore(Request $request)
    {
        $request->validate([
            'subject' => 'required|string',
            'message' => 'required|string',
            'audience' => 'required|in:all,offices,users,custom',
            'selected_users' => 'array',
            'selected_users.*' => 'exists:users,id',
            'selected_offices' => 'array',
            'selected_offices.*' => 'exists:offices,id',
        ]);

        // Placeholder for sending email logic
        return redirect()->route('notifications.email');
    }

    public function smsIndex()
    {
        return Inertia::render('admin/notifications/sms/index');
    }

    public function smsCreate()
    {
        return Inertia::render('admin/notifications/sms/create', [
            'users' => User::select('id', 'name', 'phone_number')->get(), // Assuming phone_number exists
            'offices' => Office::select('id', 'name')->get(), // Assuming offices will have phone
        ]);
    }

    public function smsStore(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'audience' => 'required|in:all,offices,users,custom',
            'selected_users' => 'array',
            'selected_users.*' => 'exists:users,id',
            'selected_offices' => 'array',
            'selected_offices.*' => 'exists:offices,id',
        ]);

        // Placeholder for sending SMS logic
        return redirect()->route('notifications.sms');
    }
}
