<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spotlight extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
