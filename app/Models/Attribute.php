<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    const TYPE_STRING = 0;
    const TYPE_INTEGER = 1;
    const TYPE_BOOLEAN = 3;
    const TYPE_SELECT = 4;

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
