<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SystemRole extends Model
{
    use HasFactory;

    public const ADMIN_ROLE_KEY = 'admin';

    public $timestamps = false;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'role_key',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_system_roles');
    }
}
