<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChamberTeam extends Model
{
    protected $fillable = [
        'name',
        'title',
        'image',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
