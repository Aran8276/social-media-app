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
        Schema::disableForeignKeyConstraints();

        Schema::create('shorts', function (Blueprint $table) {
            $table->string('id', 16)->primary();
            $table->string('owner_id', 16)->index();
            $table->foreign('owner_id')->references('id')->on('users');
            $table->string('shorts_impressions_id', 16);
            $table->foreign('shorts_impressions_id')->references('id')->on('shorts_impressions');
            $table->string('title');
            $table->enum('visibility', ['public', 'private', 'unlisted']);
            $table->string('video');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shorts');
    }
};
