<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class ChamberRegistration extends Model
{
    use HasFactory, LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('chamber_registration')
            ->logOnly(['content'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    use HasFactory;

    protected $table = 'chamber_registration';

    protected $fillable = [
        'content',
        'image',
    ];
}
