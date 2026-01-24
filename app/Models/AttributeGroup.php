<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributeGroup extends Model
{
    protected $fillable = [
        'parent_id',
        'name',
        'sort_order',
        'is_active',
    ];

    public function parent()
    {
        return $this->belongsTo(AttributeGroup::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(AttributeGroup::class, 'parent_id');
    }

    public function attributes()
    {
        return $this->hasMany(Attribute::class);
    }
}
