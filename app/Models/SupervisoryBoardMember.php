<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupervisoryBoardMember extends Model
{
    protected $fillable = [
        'name',
        'title',
        'image',
        'sort_order',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
