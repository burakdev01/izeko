<?php

namespace App\Models;

use App\Models\Concerns\LogsAdminRequestContext;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class HeroSlide extends Model
{
    use HasFactory, LogsActivity, LogsAdminRequestContext;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'subtitle',
        'image',
        'video',
        'poster',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::deleted(function (HeroSlide $slide) {
            $slide->deleteMediaFile($slide->image);
            $slide->deleteMediaFile($slide->video);
            $slide->deleteMediaFile($slide->poster);
        });
    }

    public function deleteMediaFile(?string $filename): void
    {
        if (! $filename) {
            return;
        }

        // Check if it's a full URL (external)
        if (str_starts_with($filename, 'http')) {
            return;
        }

        $path = 'hero-slides/'.$filename;

        if (Storage::disk('uploads')->exists($path)) {
            Storage::disk('uploads')->delete($path);
        }
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('hero_slides')
            ->logOnly(['title', 'subtitle', 'image', 'video', 'poster'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function shouldLogActivity(): bool
    {
        return Auth::check() && Auth::user()?->is_admin;
    }

    public function mediaUrl(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        if (
            str_starts_with($value, 'http://') ||
            str_starts_with($value, 'https://') ||
            str_starts_with($value, '/')
        ) {
            return $value;
        }

        $uploadsUrl = config('filesystems.disks.uploads.url');

        if (! is_string($uploadsUrl) || $uploadsUrl === '') {
            return $value;
        }

        $path = ltrim($value, '/');

        if (! str_starts_with($path, 'hero-slides/')) {
            $path = 'hero-slides/'.$path;
        }

        return rtrim($uploadsUrl, '/').'/'.$path;
    }
}
