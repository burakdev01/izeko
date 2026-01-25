<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'name',
        'photo_type',
        'sort',
        'photo_path',
        'is_deleted',
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
}
