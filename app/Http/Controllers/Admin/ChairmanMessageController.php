<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChairmanMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChairmanMessageController extends Controller
{
    use \App\Http\Controllers\Concerns\HandlesUploads;

    public function edit()
    {
        $message = ChairmanMessage::first();

        return Inertia::render('admin/chairman-message/edit', [
            'message' => $message ? [
                'id' => $message->id,
                'content' => $message->content,
                'image' => $message->image ? (
                    str_starts_with($message->image, 'http')
                        ? $message->image
                        : config('filesystems.disks.uploads.url') . '/chairman_message/' . $message->image
                ) : null,
            ] : null,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'content' => ['required', 'string'],
            'image_file' => ['nullable', 'image', 'max:5120'], // 5MB max
        ]);

        $message = ChairmanMessage::firstOrNew();

        // Handle Image Upload
        if ($request->hasFile('image_file')) {
            $imageName = $this->storePublicImageNameAsWebp(
                $request,
                'image_file',
                'chairman_message',
                'uploads'
            );

            if ($imageName) {
                // Delete old image if exists
                if ($message->image) {
                    Storage::disk('uploads')->delete('chairman_message/' . $message->image);
                }
                $message->image = $imageName;
            }
        }

        $message->content = $validated['content'];
        $message->save();

        return redirect()->route('admin.chairman-message.edit')
            ->with('status', 'İçerik başarıyla güncellendi.');
    }
}
