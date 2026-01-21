<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'office_id',
        'user_id',
        'title',
        'description',
        'price',
        'visit_count',
        'listing_status',
        'sort_order',
    ];

    protected $casts = [
        'category_id' => 'integer',
        'office_id' => 'integer',
        'user_id' => 'integer',
        'price' => 'decimal:2',
        'visit_count' => 'integer',
        'sort_order' => 'integer',
    ];

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
