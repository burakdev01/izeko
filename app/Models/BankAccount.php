<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class BankAccount extends Model
{
    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('bank_accounts')
            ->logOnly(['bank_name', 'account_no', 'active'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

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
