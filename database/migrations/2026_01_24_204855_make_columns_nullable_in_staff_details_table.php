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
        Schema::table('staff_details', function (Blueprint $table) {
            $table->string('license_number')->nullable()->change();
            $table->string('chamber_registration_number')->nullable()->change();
            $table->string('tax_number')->nullable()->change();
            $table->string('tax_office')->nullable()->change();
            $table->string('national_id_number')->nullable()->change();
            $table->string('title')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff_details', function (Blueprint $table) {
            $table->string('license_number')->nullable(false)->change();
            $table->string('chamber_registration_number')->nullable(false)->change();
            $table->string('tax_number')->nullable(false)->change();
            $table->string('tax_office')->nullable(false)->change();
            $table->string('national_id_number')->nullable(false)->change();
            $table->string('title')->nullable(false)->change();
        });
    }
};
