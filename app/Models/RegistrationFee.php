<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationFee extends Model
{
    protected $fillable = [
        'category',
        'newspaper_fee',
        'tax_fee',
        'registration_fee',
        'service_fee',
        'total',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}
