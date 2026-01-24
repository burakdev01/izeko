<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $fillable = [
        'attribute_group_id',
        'name',
        'data_type',
        'unit',
        'sort_order',
        'is_active',
    ];

    public function group()
    {
        return $this->belongsTo(AttributeGroup::class, 'attribute_group_id');
    }
}
