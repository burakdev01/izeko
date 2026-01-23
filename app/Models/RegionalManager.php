<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegionalManager extends Model
{
    protected $fillable = [
        'name',
        'title',
        'phone',
        'email',
        'image',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}
