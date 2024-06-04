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
        Schema::create('course__handled__bies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('prof_id');
            $table->string('prof_IDnumber')->nullable();
            $table->string('prof_name')->nullable();
            $table->string('prof_email')->nullable();
            $table->string('course_code')->nullable();
            $table->foreign('prof_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course__handled__bies');
    }
};