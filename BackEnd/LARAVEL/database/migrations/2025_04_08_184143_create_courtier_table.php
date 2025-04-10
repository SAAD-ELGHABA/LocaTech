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
        Schema::create('courtiers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('agence_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('agence_id')->references('id')->on('agences')->onDelete('cascade');
            $table->string('Années_expérience')->nullable();
            $table->string('Type_activité')->nullable();
            $table->string('Zone_activité')->nullable();
            $table->string('SEO')->nullable();
            $table->string('Licence_professionnelle')->nullable(); // Can be a file path
            $table->text('Brève_présentation')->nullable();
            $table->string('status');
            $table->rememberToken();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courtier');
    }
};
