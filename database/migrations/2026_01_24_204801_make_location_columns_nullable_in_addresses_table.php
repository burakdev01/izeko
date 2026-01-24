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
        Schema::table('addresses', function (Blueprint $table) {
            $table->unsignedBigInteger('province_id')->nullable()->change();
            $table->unsignedBigInteger('district_id')->nullable()->change();
            $table->unsignedBigInteger('neighborhood_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('addresses', function (Blueprint $table) {
            $table->unsignedBigInteger('province_id')->nullable(false)->change();
            $table->unsignedBigInteger('district_id')->nullable(false)->change();
            $table->unsignedBigInteger('neighborhood_id')->nullable(false)->change();
        });
    }
};
