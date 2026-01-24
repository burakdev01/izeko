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
        \Illuminate\Support\Facades\Log::info('ChairmanMessage update started.');
        
        $validated = $request->validate([
            'content' => ['required', 'string'],
            'image_file' => ['nullable', 'image', 'max:5120'], // 5MB max
        ]);

        $message = ChairmanMessage::firstOrNew();
        \Illuminate\Support\Facades\Log::info('Message fetched.', ['id' => $message->id, 'exists' => $message->exists]);

        // Handle Image Upload
        if ($request->hasFile('image_file')) {
            \Illuminate\Support\Facades\Log::info('Image file detected.');
            $imageName = $this->storePublicImageNameAsWebp(
                $request,
                'image_file',
                'chairman_message',
                'uploads'
            );

            if ($imageName) {
                \Illuminate\Support\Facades\Log::info('Image stored: ' . $imageName);
                
                // Delete old image if exists
                if ($message->image) {
                    Storage::disk('uploads')->delete('chairman_message/' . $message->image);
                }
                $message->image = $imageName;
                \Illuminate\Support\Facades\Log::info('Message image property set: ' . $message->image);
            } else {
                \Illuminate\Support\Facades\Log::error('Image storage returned null.');
            }
        } else {
            \Illuminate\Support\Facades\Log::info('No image file in request.');
        }

        $message->content = $validated['content'];
        $message->save();
        \Illuminate\Support\Facades\Log::info('Message saved.', ['attributes' => $message->getAttributes()]);

        return redirect()->route('admin.chairman-message.edit')
            ->with('status', 'İçerik başarıyla güncellendi.');
    }
}
