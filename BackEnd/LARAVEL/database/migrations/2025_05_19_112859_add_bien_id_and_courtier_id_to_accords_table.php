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
        Schema::table('accords', function (Blueprint $table) {
            $table->unsignedBigInteger('bienId')->nullable()->after('id');
            $table->unsignedBigInteger('courtierId')->nullable()->after('bienId');
            $table->foreign('bienId')->references('id')->on('biens')->onDelete('set null');
            $table->foreign('courtierId')->references('id')->on('courtiers')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('accords', function (Blueprint $table) {
            //
        });
    }
};
