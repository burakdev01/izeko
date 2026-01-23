<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WhyChooseUs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhyChooseUsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * Show the form for editing the singleton resource.
     */
    public function edit()
    {
        $item = WhyChooseUs::first();

        return Inertia::render('admin/why-choose-us/edit', [
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

        $item = WhyChooseUs::firstOrNew();

        $item->content = $validated['content'];
        $item->save();

        return redirect()->route('admin.why-choose-us.edit')
            ->with('status', 'İçerik başarıyla güncellendi.');
    }
}
