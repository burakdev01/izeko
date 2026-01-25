<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListingAttribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'attribute_id',
        'value_string',
        'value_int',
        'value_bool',
        'attribute_option_id',
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function option()
    {
        return $this->belongsTo(AttributeOption::class, 'attribute_option_id');
    }
}
