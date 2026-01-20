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
        // Placeholder relationship if Offices table doesn't exist yet, 
        // or just return integer if no table. 
        // User requested office_id but didn't specify Office model.
        // Assuming no Office model for now.
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
