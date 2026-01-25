<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Neighborhood extends Model
{
    use HasFactory;

    protected $fillable = ['district_id', 'name'];

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function listings()
    {
        return $this->hasManyThrough(Listing::class, Address::class, 'neighborhood_id', 'id', 'id', 'listing_id');
    }
}
