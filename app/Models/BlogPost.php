<?php

namespace App\Models;

use App\Models\Concerns\LogsAdminRequestContext;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class BlogPost extends Model
{
    use HasFactory, LogsActivity, LogsAdminRequestContext, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'content',
        'image',
        'active',
        'seo_title',
        'seo_description',

        'seo_url',
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
            ->useLogName('blog_posts')
            ->logOnly(['title', 'active', 'seo_url', 'image'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function shouldLogActivity(): bool
    {
        return Auth::check() && Auth::user()?->is_admin;
    }
}
