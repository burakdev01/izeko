<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutIzeko extends Model
{
    use HasFactory;

    protected $table = 'about_izeko';

    protected $fillable = [
        'content',
        'image',
    ];
}
