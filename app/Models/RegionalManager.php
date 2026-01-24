<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class RegionalManager extends Model
{
    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('regional_managers')
            ->logOnly(['name', 'title', 'active'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    protected $fillable = [
        'name',
        'title',
        'phone',
        'email',
        'image',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}
