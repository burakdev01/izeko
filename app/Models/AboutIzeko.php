<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class AboutIzeko extends Model
{
    use HasFactory, LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('about_izeko')
            ->logOnly(['content'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    use HasFactory;

    protected $table = 'about_izeko';

    protected $fillable = [
        'content',
        'image',
    ];
}
