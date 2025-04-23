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
        Schema::create('agences', function (Blueprint $table) {
            $table->id();
            $table->string('agence');
            $table->string('Adresse')->nullable();
            $table->string('telephone')->nullable(); // Changed to string for flexibility
            $table->string('email')->unique()->nullable();
            $table->string('Type_activité')->nullable();
            $table->text('Types_biens')->nullable(); // Text for possible multiple values
            $table->string('Zone_activité')->nullable();
            $table->string('siteWeb')->nullable();
            $table->text('SEO')->nullable();
            $table->string('Lien_Google_Reviews')->nullable();
            $table->text('Réseaux_sociaux')->nullable(); // Store as JSON or comma-separated
            $table->string('Numéro_ICE');
            $table->string('RC');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agences');
    }
};
