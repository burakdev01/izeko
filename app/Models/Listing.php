<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'office',
        'price',
        'date',
        'city',
        'status',
        'sort_order',
    ];

    protected $casts = [
        'category_id' => 'integer',
        'price' => 'decimal:2',
        'date' => 'date',
        'sort_order' => 'integer',
    ];
}
