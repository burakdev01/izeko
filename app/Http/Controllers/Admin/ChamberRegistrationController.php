<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChamberRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChamberRegistrationController extends Controller
{
    /**
     * Show the form for editing the singleton resource.
     */
    public function edit()
    {
        $item = ChamberRegistration::first();

        return Inertia::render('admin/chamber-registration/edit', [
            'item' => $item ? [
                'id' => $item->id,
                'content' => $item->content,
            ] : null,
        ]);
    }

    /**
     * Update the singleton resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'content' => ['required', 'string'],
        ]);

        $item = ChamberRegistration::firstOrNew();

        $item->content = $validated['content'];
        $item->save();

        return redirect()->route('admin.chamber-registration.edit')
            ->with('status', 'İçerik başarıyla güncellendi.');
    }
}
