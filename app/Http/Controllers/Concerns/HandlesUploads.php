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
        string $disk = 'public',
    ): ?string {
        if (! $request->hasFile($field)) {
            return null;
        }

        $path = $request->file($field)->store($directory, $disk);

        $baseUrl = config("filesystems.disks.{$disk}.url");

        if (is_string($baseUrl) && $baseUrl !== '') {
            return rtrim($baseUrl, '/').'/'.$path;
        }

        return Storage::disk($disk)->url($path);
    }

    protected function storePublicFileName(
        Request $request,
        string $field,
        string $directory,
        string $disk = 'public',
    ): ?string {
        if (! $request->hasFile($field)) {
            return null;
        }

        $path = $request->file($field)->store($directory, $disk);

        return basename($path);
    }
}
