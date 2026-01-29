<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasColumn('user_office_roles', 'created_at')
            && ! Schema::hasColumn('user_office_roles', 'updated_at')) {
            Schema::table('user_office_roles', function (Blueprint $table) {
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('user_office_roles', 'created_at')
            || Schema::hasColumn('user_office_roles', 'updated_at')) {
            Schema::table('user_office_roles', function (Blueprint $table) {
                $table->dropTimestamps();
            });
        }
    }
};
