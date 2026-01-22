<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('iletisim');
    }

    public function store(Request $request)
    {
        try {
            \Illuminate\Support\Facades\Log::info('Contact form submission received', $request->all());

            // Google reCAPTCHA Verification
            $url = 'https://www.google.com/recaptcha/api/siteverify';
            $privatekey = "6Ld_jFIsAAAAAMQq2TGJ8YU5j-ryeK5CxZmZCrA0";
            $response = file_get_contents($url."?secret=".$privatekey."&response=".$request->input('g-recaptcha-response')."&remoteip=".$request->ip());
            $data = json_decode($response);

            if (!$data->success) {
                return Redirect::back()->withErrors(['message' => 'Doğrulama başarısız. Lütfen robot olmadığınızı doğrulayın.']);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:20',
                'subject' => 'nullable|string|max:255',
                'message' => 'required|string',
                'kvkk_consent' => 'required', // Relaxed from accepted
            ]);

            \Illuminate\Support\Facades\Log::info('Validation passed', $validated);

            $message = ContactMessage::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'subject' => $validated['subject'],
                'message' => $validated['message'],
                'ip_address' => $request->ip(),
            ]);

            \Illuminate\Support\Facades\Log::info('Message created', $message->toArray());

            return Redirect::back()->with('success', 'Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.');

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Contact form error: ' . $e->getMessage());
            return Redirect::back()->withErrors(['message' => 'Bir hata oluştu: ' . $e->getMessage()]);
        }
    }
}
