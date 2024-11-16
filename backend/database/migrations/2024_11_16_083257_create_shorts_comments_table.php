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

        Schema::create('shorts_comments', function (Blueprint $table) {
            $table->string('id', 16)->primary();
            $table->string('owner_id', 16);
            $table->foreign('owner_id')->references('id')->on('users');
            $table->string('shorts_impressions_id', 16);
            $table->foreign('shorts_impressions_id')->references('id')->on('shorts_impressions');
            $table->longText('comment');
            $table->bigInteger('likes');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shorts_comments');
    }
};
