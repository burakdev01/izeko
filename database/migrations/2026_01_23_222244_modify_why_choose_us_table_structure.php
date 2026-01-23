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
        Schema::table('why_choose_us', function (Blueprint $table) {
            $table->dropColumn(['title', 'description', 'active', 'sort_order']);
            $table->longText('content')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('why_choose_us', function (Blueprint $table) {
            $table->string('title')->nullable();
            $table->text('description');
            $table->boolean('active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->dropColumn('content');
        });
    }
};
