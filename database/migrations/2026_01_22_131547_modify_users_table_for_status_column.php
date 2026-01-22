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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('status', ['pending', 'active', 'passive'])->default('pending')->after('email');
        });

        // Migrate existing data
        DB::statement("UPDATE users SET status = 'active' WHERE is_active = 1");
        DB::statement("UPDATE users SET status = 'passive' WHERE is_active = 0");

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('remember_token');
        });

        // Restore data
        DB::statement("UPDATE users SET is_active = 1 WHERE status = 'active'");
        DB::statement("UPDATE users SET is_active = 0 WHERE status = 'passive' OR status = 'pending'");

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
