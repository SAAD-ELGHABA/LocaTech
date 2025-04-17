<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('ville', function (Blueprint $table) {
            $table->dropColumn('code_postal');  // Make 'nom' unique
        });
    }

    public function down()
    {
        Schema::table('ville', function (Blueprint $table) {
            $table->dropUnique(['nom']);  // Remove the unique constraint on 'nom'
        });
    }
};
