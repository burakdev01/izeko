<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HandlesUploads
{
    protected function storePublicFile(
        Request $request,
        string $field,
        string $directory,
    ): ?string {
        if (! $request->hasFile($field)) {
            return null;
        }

        $path = $request->file($field)->store($directory, 'public');

        return Storage::disk('public')->url($path);
    }
}
