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
        // 1. Add temporary integer column
        Schema::table('attributes', function (Blueprint $table) {
            $table->integer('data_type_int')->nullable()->after('data_type');
        });

        // 2. Map existing data
        \Illuminate\Support\Facades\DB::statement("
            UPDATE attributes SET data_type_int = CASE
                WHEN data_type = 'string' THEN 0
                WHEN data_type = 'number' THEN 1
                WHEN data_type = 'boolean' THEN 3
                WHEN data_type = 'option' THEN 4
                ELSE 0
            END
        ");

        // 3. Drop old enum column
        Schema::table('attributes', function (Blueprint $table) {
            $table->dropColumn('data_type');
        });

        // 4. Rename temporary column to original name and set constraints
        Schema::table('attributes', function (Blueprint $table) {
            $table->renameColumn('data_type_int', 'data_type');
        });

        // 5. Set default and not null (Doing it separately to ensure rename is done first)
        Schema::table('attributes', function (Blueprint $table) {
             $table->integer('data_type')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 1. Add temporary enum column
        Schema::table('attributes', function (Blueprint $table) {
            $table->enum('data_type_enum', ['string', 'number', 'boolean', 'option'])->nullable()->after('data_type');
        });

        // 2. Map data back
        \Illuminate\Support\Facades\DB::statement("
            UPDATE attributes SET data_type_enum = CASE
                WHEN data_type = 1 THEN 'number'
                WHEN data_type = 3 THEN 'boolean'
                WHEN data_type = 4 THEN 'option'
                ELSE 'string'
            END
        ");

        // 3. Drop int column
        Schema::table('attributes', function (Blueprint $table) {
            $table->dropColumn('data_type');
        });

        // 4. Rename enum column
        Schema::table('attributes', function (Blueprint $table) {
            $table->renameColumn('data_type_enum', 'data_type');
        });
    }
};
