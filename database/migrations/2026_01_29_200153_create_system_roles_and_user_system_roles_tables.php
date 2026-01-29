<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('system_roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role_key')->unique();
        });

        Schema::create('user_system_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('system_role_id')->constrained('system_roles')->cascadeOnDelete();
            $table->unique(['user_id', 'system_role_id']);
        });

        $adminRoleId = DB::table('system_roles')->insertGetId([
            'name' => 'Admin',
            'role_key' => 'admin',
        ]);

        $adminUserIds = DB::table('users')
            ->where('is_admin', true)
            ->pluck('id');

        if ($adminUserIds->isNotEmpty()) {
            DB::table('user_system_roles')->insert(
                $adminUserIds->map(fn (int $userId) => [
                    'user_id' => $userId,
                    'system_role_id' => $adminRoleId,
                ])->all()
            );
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false)->after('password');
        });

        $adminRoleId = DB::table('system_roles')
            ->where('role_key', 'admin')
            ->value('id');

        if ($adminRoleId) {
            $adminUserIds = DB::table('user_system_roles')
                ->where('system_role_id', $adminRoleId)
                ->pluck('user_id');

            if ($adminUserIds->isNotEmpty()) {
                DB::table('users')
                    ->whereIn('id', $adminUserIds)
                    ->update(['is_admin' => true]);
            }
        }

        Schema::dropIfExists('user_system_roles');
        Schema::dropIfExists('system_roles');
    }
};
