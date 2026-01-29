<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, LogsActivity, Notifiable;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('users')
            ->logOnly(['name', 'email', 'status'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone_number',
        'profile_photo_path',
        'cover_photo_path',
        'password',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function systemRoles(): BelongsToMany
    {
        return $this->belongsToMany(SystemRole::class, 'user_system_roles');
    }

    public function hasSystemRole(string $roleKey): bool
    {
        if ($this->relationLoaded('systemRoles')) {
            return $this->systemRoles->contains(
                fn (SystemRole $role) => $role->role_key === $roleKey
            );
        }

        return $this->systemRoles()
            ->where('role_key', $roleKey)
            ->exists();
    }

    public function isAdmin(): bool
    {
        return $this->hasSystemRole(SystemRole::ADMIN_ROLE_KEY);
    }

    public function offices()
    {
        return $this->belongsToMany(Office::class, 'user_offices');
    }

    public function userOffices()
    {
        return $this->hasMany(UserOffice::class);
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function staffDetails()
    {
        return $this->hasOne(StaffDetail::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }
}
