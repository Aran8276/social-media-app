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

        Schema::create('posts', function (Blueprint $table) {
            $table->string('id', 16)->primary();
            $table->string('owner_id', 16)->index();
            $table->foreign('owner_id')->references('id')->on('users')->onDelete("cascade")->onUpdate("cascade");
            $table->string('post_media_id', 16)->index();
            $table->foreign('post_media_id')->references('id')->on('post_media');
            $table->string('post_impressions_id', 16)->index();
            $table->foreign('post_impressions_id')->references('id')->on('post_impressions');
            $table->longText('content');
            $table->enum('visibility', ['public', 'private']);
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
