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
        \Illuminate\Support\Facades\Log::info('Storing file for field: ' . $field);
        if (! $request->hasFile($field)) {
             \Illuminate\Support\Facades\Log::warning('No file found for field: ' . $field);
            return null;
        }

        try {
            $path = $request->file($field)->store($directory, $disk);
            if ($path) {
                \Illuminate\Support\Facades\Log::info('File stored successfully at: ' . $path);
                return basename($path);
            } else {
                \Illuminate\Support\Facades\Log::error('Failed to store file in directory: ' . $directory);
                return null;
            }
        } catch (\Exception $e) {
             \Illuminate\Support\Facades\Log::error('Exception storing file: ' . $e->getMessage());
             throw $e;
        }
    }

    protected function storePublicImageNameAsWebp(
        Request $request,
        string $field,
        string $directory,
        string $disk = 'public',
    ): ?string {
        \Illuminate\Support\Facades\Log::info('Storing image as WebP for field: ' . $field);
        $file = $request->file($field);

        if (! $file) {
            \Illuminate\Support\Facades\Log::warning('No file found for field: ' . $field);
            return null;
        }

        try {
            $webpContents = $this->convertImageToWebp($file, $field);
            $fileName = $this->webpFileName($file);
            $path = rtrim($directory, '/').'/'.$fileName;

            $result = Storage::disk($disk)->put($path, $webpContents);
            
            if ($result) {
                \Illuminate\Support\Facades\Log::info('Image stored successfully at: ' . $path);
                return $fileName;
            } else {
                \Illuminate\Support\Facades\Log::error('Failed to store image at: ' . $path);
                return null;
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Exception storing image: ' . $e->getMessage());
            throw $e;
        }
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
