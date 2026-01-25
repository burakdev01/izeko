<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Listing extends Model
{
    use HasFactory, LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('listings')
            ->logOnly(['title', 'price', 'listing_status', 'city', 'district'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    protected $fillable = [
        'category_id',
        'office_id',
        'user_id',
        'title',
        'description',
        'price',
        'visit_count',
        'listing_status',
        'sort_order',
        'main_photo_path',
    ];

    protected $casts = [
        'category_id' => 'integer',
        'office_id' => 'integer',
        'user_id' => 'integer',
        'price' => 'decimal:2',
        'visit_count' => 'integer',
        'sort_order' => 'integer',
    ];

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function attributes()
    {
        return $this->hasMany(ListingAttribute::class);
    }
}
