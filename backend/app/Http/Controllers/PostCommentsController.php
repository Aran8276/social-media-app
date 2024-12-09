<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\PostImpressions;
use Illuminate\Support\Facades\Auth;

class PostCommentsController extends Controller
{
    public function getCommentsByPostId($id)
    {
        $post = PostImpressions::find($id);
        if (!$post) {
            return response()->json([
                "success" => false,
                "message" => "Post Impressions not found " . $id,
                "post" => $id
            ], 404);
        }

        $comments = PostComment::with(['user'])->where("post_impressions_id", $id)->get();
        $user = Auth::user();

        if ($user) {
            $liked_contents = json_decode($user->liked_contents, true);
            $comments->each(function ($comments) use ($liked_contents, $user) {
                $comments->is_liked = in_array($comments->id, $liked_contents);
                if ($comments->owner_id == $user->id) {
                    $comments->is_owned = true;
                } else {
                    $comments->is_owned = false;
                }
            });
            return response()->json([
                "success" => true,
                "message" => "Comments retrieved",
                "comments" => $comments
            ]);
        }

        $comments->each(function ($comments) {
            $comments->is_liked = false;
            $comments->is_owned = false;
        });

        return response()->json([
            "success" => true,
            "message" => "Comments retrieved",
            "comments" => $comments
        ]);
    }

    public function store($id, Request $request)
    {
        $request->validate([
            'comment' => 'required|max:4096',
        ]);

        $post = PostImpressions::find($id);
        if (!$post) {
            return response()->json([
                "success" => false,
                "message" => "Post Impressions not found " . $id,
                "post" => $id
            ], 404);
        }

        $comment_id = Str::random(16);
        $owner_id = Auth::user()->id;
        $post_impressions_id = $post->id;

        PostComment::create([
            'id' => $comment_id,
            'owner_id' => $owner_id,
            'post_impressions_id' => $post_impressions_id,
            'comment' => $request->comment,
            'likes' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            "success" => true,
            "message" => "Comment created " . $comment_id,
            "comment" => $comment_id,
        ]);
    }

    public function update($id, Request $request)
    {
        $request->validate([
            'comment' => 'required|max:4096',
        ]);

        $comment = PostComment::find($id);
        if (!$comment) {
            return response()->json([
                "success" => false,
                "message" => "Post comment not found " . $id,
                "post" => $id
            ], 404);
        }

        $comment->update([
            'comment' => $request->comment,
            'updated_at' => now(),
        ]);

        return response()->json([
            "success" => true,
            "message" => "Comment edited " . $comment->id,
            "comment" => $comment->id,
        ]);
    }

    public function delete($id, Request $request)
    {
        $request->validate([
            'comment' => 'required|max:4096',
        ]);

        $comment = PostComment::find($id);
        if (!$comment) {
            return response()->json([
                "success" => false,
                "message" => "Post comment not found " . $id,
                "post" => $id
            ], 404);
        }

        $comment->delete();

        return response()->json([
            "success" => true,
            "message" => "Comment deleted"
        ]);
    }
}
