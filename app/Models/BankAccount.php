<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    protected $fillable = [
        'bank_name',
        'branch_name',
        'branch_code',
        'account_no',
        'iban',
        'account_name',
        'image',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}
