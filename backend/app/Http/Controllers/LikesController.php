<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use App\Models\PostImpressions;
use App\Models\Posts;
use App\Models\ShortsComment;
use App\Models\ShortsImpressions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikesController extends Controller
{
    public function getLikedContents()
    {
        $user = Auth::user();

        return response()->json([
            "data" => json_decode($user->liked_contents)
        ]);
    }


    public function likePost($id)
    {
        $post = PostImpressions::find($id);
        if (!$post) {
            return response()->json([
                "success" => false,
                "message" => "Post Impressions not found " . $id,
                "post" => $id
            ], 404);
        }

        $user = Auth::user();
        $user_model = User::find($user->id);
        $liked_contents = json_decode($user->liked_contents);
        $prev_likes = $post->likes;

        if (!in_array($post->id, $liked_contents)) {
            $post->likes = $prev_likes + 1;
            array_push($liked_contents, $post->id);
            $user_model->liked_contents = json_encode($liked_contents);
            $post->save();
            $user_model->save();
            return response()->json([
                "success" => true,
                "message" => "Post liked",
                "post" => $id
            ]);
        }


        // this prevents so it won't go to the negatives if the array is on the user, but the likes is still at 0
        if ($prev_likes == 0) {
            return response()->json([
                "success" => false,
                "message" => "Failed to like this post",
            ], 400);
        }

        $post->likes = $prev_likes - 1;

        $key = array_search($post->id, $liked_contents);

        if ($key !== false) {
            unset($liked_contents[$key]);
        }

        $user_model->liked_contents = json_encode($liked_contents);

        $post->save();
        $user_model->save();

        return response()->json([
            "success" => true,
            "message" => "Post un-liked",
            "post" => $id
        ]);
    }

    public function likeShorts($id)
    {
        $shorts = ShortsImpressions::find($id);
        if (!$shorts) {
            return response()->json([
                "success" => false,
                "message" => "Shorts Impressions not found " . $id,
                "post" => $id
            ], 404);
        }

        $user = Auth::user();
        $user_model = User::find($user->id);
        $liked_contents = json_decode($user->liked_contents);
        $prev_likes = $shorts->likes;

        if (!in_array($shorts->id, $liked_contents)) {
            $shorts->likes = $prev_likes + 1;
            array_push($liked_contents, $shorts->id);
            $user_model->liked_contents = json_encode($liked_contents);
            $shorts->save();
            $user_model->save();
            return response()->json([
                "success" => true,
                "message" => "Shorts liked",
                "shorts" => $id
            ]);
        }


        // this prevents so it won't go to the negatives if the array is on the user, but the likes is still at 0
        if ($prev_likes == 0) {
            return response()->json([
                "success" => false,
                "message" => "Failed to like this shorts",
            ], 400);
        }

        $shorts->likes = $prev_likes - 1;

        $key = array_search($shorts->id, $liked_contents);

        if ($key !== false) {
            unset($liked_contents[$key]);
        }

        $user_model->liked_contents = json_encode($liked_contents);

        $shorts->save();
        $user_model->save();

        return response()->json([
            "success" => true,
            "message" => "Shorts un-liked",
            "shorts" => $id
        ]);
    }

    public function likePostComment($id)
    {
        $comment = PostComment::find($id);
        if (!$comment) {
            return response()->json([
                "success" => false,
                "message" => "Comment not found " . $id,
                "comment" => $id
            ], 404);
        }

        $user = Auth::user();
        $user_model = User::find($user->id);
        $liked_contents = json_decode($user->liked_contents);
        $prev_likes = $comment->likes;

        if (!in_array($comment->id, $liked_contents)) {
            $comment->likes = $prev_likes + 1;
            array_push($liked_contents, $comment->id);
            $user_model->liked_contents = json_encode($liked_contents);
            $comment->save();
            $user_model->save();
            return response()->json([
                "success" => true,
                "message" => "Comment liked " . $id,
                "comment" => $id
            ]);
        }

        // this prevents so it won't go to the negatives if the array is on the user, but the likes is still at 0
        if ($prev_likes == 0) {
            return response()->json([
                "success" => false,
                "message" => "Failed to like this comment",
            ], 400);
        }

        $comment->likes = $prev_likes - 1;

        $key = array_search($comment->id, $liked_contents);

        if ($key !== false) {
            unset($liked_contents[$key]);
        }

        $user_model->liked_contents = json_encode($liked_contents);

        $comment->save();
        $user_model->save();

        return response()->json([
            "success" => true,
            "message" => "Comment un-liked",
            "comment" => $id
        ]);
    }

    public function likeShortsComment($id)
    {
        $comment = ShortsComment::find($id);
        if (!$comment) {
            return response()->json([
                "success" => false,
                "message" => "Comment not found " . $id,
                "comment" => $id
            ], 404);
        }

        $user = Auth::user();
        $user_model = User::find($user->id);
        $liked_contents = json_decode($user->liked_contents);
        $prev_likes = $comment->likes;

        if (!in_array($comment->id, $liked_contents)) {
            $comment->likes = $prev_likes + 1;
            array_push($liked_contents, $comment->id);
            $user_model->liked_contents = json_encode($liked_contents);
            $comment->save();
            $user_model->save();
            return response()->json([
                "success" => true,
                "message" => "Comment liked " . $id,
                "comment" => $id
            ]);
        }

        // this prevents so it won't go to the negatives if the array is on the user, but the likes is still at 0
        if ($prev_likes == 0) {
            return response()->json([
                "success" => false,
                "message" => "Failed to like this comment",
            ], 400);
        }

        $comment->likes = $prev_likes - 1;

        $key = array_search($comment->id, $liked_contents);

        if ($key !== false) {
            unset($liked_contents[$key]);
        }

        $user_model->liked_contents = json_encode($liked_contents);

        $comment->save();
        $user_model->save();

        return response()->json([
            "success" => true,
            "message" => "Comment un-liked",
            "comment" => $id
        ]);
    }
}
