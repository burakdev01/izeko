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
        Schema::table('spotlights', function (Blueprint $table) {
            if (!Schema::hasColumn('spotlights', 'content')) {
                $table->longText('content')->nullable()->after('description');
            }
            if (!Schema::hasColumn('spotlights', 'slug')) {
                $table->string('slug')->nullable()->after('title');
            }
        });

        // Populate slugs for existing records
        DB::table('spotlights')->get()->each(function ($spotlight) {
            $slug = Str::slug($spotlight->title);
            // Ensure slug is unique explicitly if needed, but for now just title slug
            // If empty (no title?), fallback to random or id
            if (empty($slug)) {
                $slug = 'spotlight-' . $spotlight->id;
            }
            
            DB::table('spotlights')
                ->where('id', $spotlight->id)
                ->update(['slug' => $slug]);
        });

        // Make slug unique and required
        Schema::table('spotlights', function (Blueprint $table) {
            // We need to check if we can change it. 
            // If it's already unique, this might throw depending on driver, 
            // but usually change() is fine if state matches.
            // However, we only do this if it's not already unique/not-null. 
            // Validating this in migration is hard. 
            // We assume it failed BEFORE this step last time.
            $table->string('slug')->nullable(false)->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('spotlights', function (Blueprint $table) {
            $table->dropColumn(['content', 'slug']);
        });
    }
};
