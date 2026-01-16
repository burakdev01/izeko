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
        $tables = ['activities', 'live_streams', 'announcements', 'blog_posts'];

        foreach ($tables as $table) {
            if (Schema::hasColumn($table, 'date')) {
                Schema::table($table, function (Blueprint $blueprint) {
                    $blueprint->dropColumn('date');
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = ['activities', 'live_streams', 'announcements', 'blog_posts'];

        foreach ($tables as $table) {
            if (! Schema::hasColumn($table, 'date')) {
                Schema::table($table, function (Blueprint $blueprint) {
                    $blueprint->date('date')->nullable();
                });
            }
        }
    }
};
