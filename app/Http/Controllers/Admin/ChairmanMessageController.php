<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChairmanMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChairmanMessageController extends Controller
{
    public function edit()
    {
        $message = ChairmanMessage::first();

        return Inertia::render('admin/chairman-message/edit', [
            'message' => $message ? [
                'id' => $message->id,
                'content' => $message->content,
            ] : null,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'content' => ['required', 'string'],
        ]);

        $message = ChairmanMessage::firstOrNew();

        $message->content = $validated['content'];
        $message->save();

        return redirect()->route('admin.chairman-message.edit')
            ->with('status', 'İçerik başarıyla güncellendi.');
    }
}
