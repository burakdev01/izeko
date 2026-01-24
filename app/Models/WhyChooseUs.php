<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class WhyChooseUs extends Model
{
    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('why_choose_us')
            ->logOnly(['content'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    protected $table = 'why_choose_us';

    protected $fillable = [
        'content',
        'image',
    ];
}
