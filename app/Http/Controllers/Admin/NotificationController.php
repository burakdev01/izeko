<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Office;
use App\Models\User;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function emailIndex(Request $request)
    {
        $query = Notification::where('type', 'email');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $notifications = $query->orderByDesc('created_at')->get();

        return Inertia::render('admin/notifications/email/index', [
            'notifications' => $notifications,
            'filters' => $request->only(['search']),
        ]);
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
        $validated = $request->validate([
            'subject' => 'required|string',
            'message' => 'required|string',
            'audience' => 'required|in:all,offices,users,custom',
            'selected_users' => 'array',
            'selected_users.*' => 'exists:users,id',
            'selected_offices' => 'array',
            'selected_offices.*' => 'exists:offices,id',
        ]);

        $recipientCount = 0;
        if ($validated['audience'] === 'all') {
            $recipientCount = User::count();
        } elseif ($validated['audience'] === 'offices') {
            $recipientCount = Office::count();
        } elseif ($validated['audience'] === 'users' || $validated['audience'] === 'custom') {
            $recipientCount = count($validated['selected_users'] ?? []);
        } elseif ($request->has('selected_offices')) {
             $recipientCount += count($validated['selected_offices'] ?? []);
        }

        Notification::create([
            'type' => 'email',
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'recipient_count' => $recipientCount,
            'audience' => $validated['audience'],
        ]);

        return redirect()->route('admin.notifications.email.index')
            ->with('success', 'E-posta gönderimi başlatıldı.');
    }

    public function smsIndex(Request $request)
    {
        $query = Notification::where('type', 'sms');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $notifications = $query->orderByDesc('created_at')->get();

        return Inertia::render('admin/notifications/sms/index', [
            'notifications' => $notifications,
            'filters' => $request->only(['search']),
        ]);
    }

    public function smsCreate()
    {
        return Inertia::render('admin/notifications/sms/create', [
            'users' => User::select('id', 'name', 'phone_number')->get(),
            'offices' => Office::select('id', 'name')->get(),
        ]);
    }

    public function smsStore(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string', // Added subject validation
            'message' => 'required|string',
            'audience' => 'required|in:all,offices,users,custom',
            'selected_users' => 'array',
            'selected_users.*' => 'exists:users,id',
            'selected_offices' => 'array',
            'selected_offices.*' => 'exists:offices,id',
        ]);

        $recipientCount = 0;
        if ($validated['audience'] === 'all') {
            $recipientCount = User::whereNotNull('phone_number')->count();
        } elseif ($validated['audience'] === 'offices') {
            $recipientCount = Office::count();
        } elseif ($validated['audience'] === 'users' || $validated['audience'] === 'custom') {
            $recipientCount = count($validated['selected_users'] ?? []);
        } elseif ($request->has('selected_offices')) {
             $recipientCount += count($validated['selected_offices'] ?? []);
        }

        Notification::create([
            'type' => 'sms',
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'recipient_count' => $recipientCount,
            'audience' => $validated['audience'],
        ]);

        return redirect()->route('admin.notifications.sms.index')
            ->with('success', 'SMS gönderimi başlatıldı.');
    }
}
