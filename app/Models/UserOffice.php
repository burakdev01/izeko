<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Office;
use App\Models\Role;
use App\Models\UserOfficeRole;

class UserOffice extends Model
{
    /** @use HasFactory<\Database\Factories\UserOfficeFactory> */
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function role()
    {
        return $this->hasOneThrough(Role::class, UserOfficeRole::class, 'user_office_id', 'id', 'id', 'role_id');
    }
    
    public function userOfficeRole() {
         return $this->hasOne(UserOfficeRole::class);
    }
}
