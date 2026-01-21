<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spotlight extends Model
{
    protected $fillable = [
        'title',
        'description',
        'content',
        'slug',
        'image',
        'active',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'sort_order',
    ];

    /**
     * Get the attributes that should be cast.
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

    protected static function booted()
    {
        static::creating(function ($spotlight) {
            if (empty($spotlight->slug)) {
                $spotlight->slug = \Illuminate\Support\Str::slug($spotlight->title);
            }
        });

        static::updating(function ($spotlight) {
            if (empty($spotlight->slug) || $spotlight->isDirty('title')) {
                // Keep slug consistent with title if title changes, OR keep old slug?
                // Usually for permalinks we might want to keep old slug to avoid breaking links.
                // But for a simple system, updating slug with title is often expected.
                // However, since we rely on unique slug, changing it might cause collision.
                // Let's only set if empty for now effectively, or if we want to force updates.
                // Given the user wants "rich content page", permalinks matter.
                // Let's generate if empty. If title changes, user might want slug update.
                // I will update it if title changes, but handle uniqueness?
                // Str::slug doesn't guarantee uniqueness.
                // I'll leave it simple: generate if empty.
                if (empty($spotlight->slug)) {
                     $spotlight->slug = \Illuminate\Support\Str::slug($spotlight->title);
                }
            }
        });
    }
}
