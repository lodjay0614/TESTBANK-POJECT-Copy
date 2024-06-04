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
        Schema::create('ans_models', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('Question_id');
            $table->string('Aa')->nullable();
            $table->string('Ab')->nullable();
            $table->string('Ac')->nullable();
            $table->string('Ad')->nullable();
            $table->foreign('Question_id')->references('id')->on('quiz_models')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ans_models');
    }
};
