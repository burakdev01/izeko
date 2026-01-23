<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutIzeko;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutIzekoController extends Controller
{
    /**
     * Show the form for editing the singleton resource.
     */
    public function edit()
    {
        $item = AboutIzeko::first();

        return Inertia::render('admin/about-izeko/edit', [
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

        $item = AboutIzeko::firstOrNew();

        $item->content = $validated['content'];
        $item->save();

        return redirect()->route('admin.about-izeko.edit')
            ->with('status', 'İçerik başarıyla güncellendi.');
    }
}
