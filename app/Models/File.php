<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'file_path',
        'file_type',
        'is_deleted',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
