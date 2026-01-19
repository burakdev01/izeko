<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

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

    protected function storePublicImageNameAsWebp(
        Request $request,
        string $field,
        string $directory,
        string $disk = 'public',
    ): ?string {
        $file = $request->file($field);

        if (! $file) {
            return null;
        }

        $webpContents = $this->convertImageToWebp($file, $field);
        $fileName = $this->webpFileName($file);
        $path = rtrim($directory, '/').'/'.$fileName;

        Storage::disk($disk)->put($path, $webpContents);

        return $fileName;
    }

    protected function storePublicImageAsWebp(
        Request $request,
        string $field,
        string $directory,
        string $disk = 'public',
    ): ?string {
        $file = $request->file($field);

        if (! $file) {
            return null;
        }

        $webpContents = $this->convertImageToWebp($file, $field);
        $fileName = $this->webpFileName($file);
        $path = rtrim($directory, '/').'/'.$fileName;

        Storage::disk($disk)->put($path, $webpContents);

        $baseUrl = config("filesystems.disks.{$disk}.url");

        if (is_string($baseUrl) && $baseUrl !== '') {
            return rtrim($baseUrl, '/').'/'.$path;
        }

        return Storage::disk($disk)->url($path);
    }

    private function convertImageToWebp(
        UploadedFile $file,
        string $field,
    ): string {
        if (! function_exists('imagewebp')) {
            throw ValidationException::withMessages([
                $field => 'WebP desteği bulunamadı.',
            ]);
        }

        $contents = file_get_contents($file->getRealPath());

        if ($contents === false) {
            throw ValidationException::withMessages([
                $field => 'Görsel okunamadı.',
            ]);
        }

        $image = imagecreatefromstring($contents);

        if (! $image) {
            throw ValidationException::withMessages([
                $field => 'Görsel işlenemedi.',
            ]);
        }

        imagepalettetotruecolor($image);
        imagealphablending($image, true);
        imagesavealpha($image, true);

        ob_start();
        $success = imagewebp($image, null, 85);
        $webpContents = ob_get_clean();
        imagedestroy($image);

        if (! $success || $webpContents === false) {
            throw ValidationException::withMessages([
                $field => 'Görsel WebP formatına çevrilemedi.',
            ]);
        }

        return $webpContents;
    }

    private function webpFileName(UploadedFile $file): string
    {
        $baseName = pathinfo($file->hashName(), PATHINFO_FILENAME);

        return $baseName.'.webp';
    }
}
