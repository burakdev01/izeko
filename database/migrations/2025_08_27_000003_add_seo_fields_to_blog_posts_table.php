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
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->boolean('active')->default(true)->after('image');
            $table->string('seo_title')->nullable()->after('active');
            $table->text('seo_description')->nullable()->after('seo_title');
            $table->string('seo_url')->nullable()->after('seo_description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn([
                'active',
                'seo_title',
                'seo_description',
                'seo_url',
            ]);
        });
    }
};
