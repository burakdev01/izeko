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
        Schema::dropIfExists('listings');

        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id')->default(0);
            $table->integer('office_id');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('visit_count')->default(0);
            $table->integer('sort_order')->default(0)->nullable();
            $table->enum('listing_status', ['active', 'inactive', 'pending'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
        
        // Restore original table structure (approximate)
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id')->default(0);
            $table->string('title');
            $table->string('office');
            $table->decimal('price', 10, 2);
            $table->date('date');
            $table->string('city');
            $table->string('status')->default('pending');
            $table->integer('sort_order')->default(0)->nullable();
            $table->timestamps();
        });
    }
};
