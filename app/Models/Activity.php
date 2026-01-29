<?php

namespace App\Models;

use App\Models\Concerns\LogsAdminRequestContext;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Activity extends Model
{
    use HasFactory, LogsActivity, LogsAdminRequestContext, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'video_url',
        'thumbnail',
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

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('activities')
            ->logOnly(['title', 'video_url', 'thumbnail', 'active'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function shouldLogActivity(): bool
    {
        return Auth::check() && Auth::user()?->isAdmin();
    }

    public function youtubeId(): ?string
    {
        $value = $this->video_url;

        if (! $value) {
            return null;
        }

        if (preg_match('/^[A-Za-z0-9_-]{11}$/', $value)) {
            return $value;
        }

        $pattern =
            '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?|shorts)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i';

        if (preg_match($pattern, $value, $matches)) {
            return $matches[1];
        }

        return null;
    }

    public function youtubeUrl(): ?string
    {
        $id = $this->youtubeId();

        if (! $id) {
            return null;
        }

        return $id;
    }

    public function youtubeThumbnail(): ?string
    {
        $id = $this->youtubeId();

        if (! $id) {
            return null;
        }

        return 'https://img.youtube.com/vi/'.$id.'/hqdefault.jpg';
    }
}
