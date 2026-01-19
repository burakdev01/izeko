<?php

namespace App\Models;

use App\Models\Concerns\LogsAdminRequestContext;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Announcement extends Model
{
    use HasFactory, LogsActivity, LogsAdminRequestContext, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'subtitle',
        'excerpt',
        'content',
        'image',
        'link',
        'active',
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
            'active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::forceDeleted(function (Announcement $announcement): void {
            $announcement->deleteImageFromUploads();
        });
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('announcements')
            ->logOnly(['title', 'subtitle', 'link', 'image', 'active'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function shouldLogActivity(): bool
    {
        return Auth::check() && Auth::user()?->is_admin;
    }

    private function deleteImageFromUploads(): void
    {
        $path = $this->uploadsPathFromImage($this->image);

        if (! $path) {
            return;
        }

        Storage::disk('uploads')->delete($path);
    }

    private function uploadsPathFromImage(?string $image): ?string
    {
        if (! $image) {
            return null;
        }

        $normalized = trim($image);

        if ($normalized === '') {
            return null;
        }

        $uploadsSegment = '/uploads/';
        $path = parse_url($normalized, PHP_URL_PATH);

        if (is_string($path) && str_contains($path, $uploadsSegment)) {
            return ltrim(str_replace($uploadsSegment, '', $path), '/');
        }

        if (str_contains($normalized, '://')) {
            return null;
        }

        return ltrim($normalized, '/');
    }
}
