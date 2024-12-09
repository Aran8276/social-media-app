<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\PostCommentsController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\ShortsCommentsController;
use App\Http\Controllers\ShortsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth');

Route::get('/posts', [PostsController::class, 'index']);
Route::get('/shorts', [ShortsController::class, 'index']);

Route::get('/posts/view', [PostsController::class, 'incrementView']);

Route::get('/posts/{id}', [PostsController::class, 'showById']);
Route::get('/shorts/{id}', [ShortsController::class, 'showById']);

Route::get('/posts/comment/{id}', [PostCommentsController::class, 'getCommentsByPostId']);
Route::get('/shorts/comment/{id}', [ShortsCommentsController::class, 'getCommentsByShortsId']);

Route::post('/posts/comment/{id}/like', [LikesController::class, 'likePostComment']);
Route::post('/shorts/comment/{id}/like', [LikesController::class, 'likeShortsComment']);

Route::middleware('auth')->group(function () {
    Route::get('/user', function () {
        $user = Auth::user();
        return $user;
    });

    Route::post('/posts', [PostsController::class, 'store']);
    Route::put('/posts/{id}', [PostsController::class, 'update']);
    Route::delete('/posts/{id}', [PostsController::class, 'delete']);

    Route::post('/shorts', [ShortsController::class, 'store']);
    Route::put('/shorts/{id}', [ShortsController::class, 'update']);
    Route::delete('/shorts/{id}', [ShortsController::class, 'delete']);

    Route::post('/liked', [LikesController::class, 'getLikedContents']);

    Route::post('/posts/like/{id}', [LikesController::class, 'likePost']);
    Route::post('/shorts/like/{id}', [LikesController::class, 'likeShorts']);

    Route::post('/posts/comment/{id}', [PostCommentsController::class, 'store']);
    Route::put('/posts/comment/{id}', [PostCommentsController::class, 'update']);
    Route::delete('/posts/comment/{id}', [PostCommentsController::class, 'delete']);

    Route::post('/shorts/comment/{id}', [ShortsCommentsController::class, 'store']);
    Route::put('/shorts/comment/{id}', [ShortsCommentsController::class, 'update']);
    Route::delete('/shorts/comment/{id}', [ShortsCommentsController::class, 'delete']);
});

Route::prefix("auth")->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    // Route::post('me', [AuthController::class, 'me']);
});
