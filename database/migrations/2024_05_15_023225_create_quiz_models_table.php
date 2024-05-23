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
        Schema::create('quiz_models', function (Blueprint $table) {
            $table->id();
            $table->integer('Qnum')->nullable();
            $table->string('Question')->nullable();
            $table->string('Aa')->nullable();
            $table->string('Ab')->nullable();
            $table->string('Ac')->nullable();
            $table->string('Ad')->nullable();
            $table->string('Akey')->nullable();
            $table->string('difficulty')->nullable();
            $table->string('department_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_models');
    }
};