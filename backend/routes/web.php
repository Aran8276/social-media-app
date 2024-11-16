<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        "message" => "API is working",
        "status" => 200
    ], 200);
})->name('login');
