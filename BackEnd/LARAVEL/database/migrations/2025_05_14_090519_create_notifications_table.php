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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender')->nullable();
            $table->unsignedBigInteger('receiver');
            $table->foreign('sender')->references('id')->on('users')->onDelete('set null');
            $table->foreign('receiver')->references('id')->on('users')->onDelete('cascade');
            $table->string('object');
            $table->text('body')->nullable();
            $table->json('data')->nullable();
            $table->timestamp('time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
