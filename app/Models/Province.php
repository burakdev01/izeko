<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $fillable = ['name'];

    public function districts()
    {
        return $this->hasMany(District::class);
    }

    public function listings()
    {
        return $this->hasManyThrough(Listing::class, Address::class, 'province_id', 'id', 'id', 'listing_id');
    }
}
