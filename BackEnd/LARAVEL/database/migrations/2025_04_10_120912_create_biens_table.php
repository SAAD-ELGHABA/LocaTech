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
        Schema::create('biens', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('courtier_id');
            $table->foreign('courtier_id')->references('id')->on('courtiers')->onDelete('cascade');

            $table->string('title');
            $table->text('description');

            $table->integer('budget');
            $table->integer('superficier');

            $table->string('ville');
            $table->string('quartier')->nullable();
            $table->string('type')->nullable();
            $table->string('typeAffaire')->nullable();

            $table->json('images')->nullable();
            $table->string('video_url')->nullable();

            $table->integer('chambres')->nullable();
            $table->integer('salles_de_bain')->nullable();
            $table->integer('etage')->nullable();
            $table->boolean('meuble')->nullable();

            $table->integer('status')->default(1);

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biens');
    }
};
