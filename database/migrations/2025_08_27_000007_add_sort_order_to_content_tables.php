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
        $tables = ['activities', 'live_streams', 'announcements', 'blog_posts'];

        foreach ($tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->unsignedInteger('sort_order')->default(0);
            });

            $ids = DB::table($tableName)->orderBy('id')->pluck('id');
            foreach ($ids as $index => $id) {
                DB::table($tableName)
                    ->where('id', $id)
                    ->update(['sort_order' => $index + 1]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = ['activities', 'live_streams', 'announcements', 'blog_posts'];

        foreach ($tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->dropColumn('sort_order');
            });
        }
    }
};
