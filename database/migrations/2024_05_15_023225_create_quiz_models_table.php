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
            $table->string('handled_by')->nullable();
            $table->string('Qstatus')->nullable();
            $table->string('Question')->nullable();
            
            $table->string('Akey')->nullable();
            $table->string('difficulty')->nullable();
            $table->string('FieldOf')->nullable();
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