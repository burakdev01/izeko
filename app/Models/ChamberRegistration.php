<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChamberRegistration extends Model
{
    use HasFactory;

    protected $table = 'chamber_registration';

    protected $fillable = [
        'content',
        'image',
    ];
}
