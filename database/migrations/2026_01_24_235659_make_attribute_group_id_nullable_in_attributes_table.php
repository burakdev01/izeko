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
        Schema::table('attributes', function (Blueprint $table) {
            // Using DB::statement because ->nullable()->change() might require doctrine/dbal
            // and simply modifying the column is safer with raw SQL in some environments if package missing
            // But let's try the Laravel way first, if it fails we can fallback.
            // Actually, to avoid "Class 'Doctrine\DBAL\Driver\AbstractMySQLDriver' not found" errors,
            // we will try to make it nullable.
            $table->unsignedBigInteger('attribute_group_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attributes', function (Blueprint $table) {
            $table->unsignedBigInteger('attribute_group_id')->nullable(false)->change();
        });
    }
};
