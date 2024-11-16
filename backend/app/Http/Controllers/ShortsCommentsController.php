<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ShortsComment;
use App\Models\ShortsImpressions;
use Illuminate\Support\Facades\Auth;

class ShortsCommentsController extends Controller
{
    public function getCommentsByShortsId($id)
    {
        $shorts = ShortsImpressions::find($id);
        if (!$shorts) {
            return response()->json([
                "success" => false,
                "message" => "Shorts Impressions not found " . $id,
                "post" => $id
            ], 404);
        }

        $comments = ShortsComment::where("shorts_impressions_id", $id)->get();
        $user = Auth::user();

        if ($user) {
            $liked_contents = json_decode($user->liked_contents);
            $comments->each(function ($comments) use ($liked_contents) {
                $comments->is_liked = in_array($comments->id, $liked_contents);
            });
            return response()->json([
                "success" => true,
                "message" => "Comments retrieved",
                "comments" => $comments
            ]);
        }

        $comments->each(function ($comments) {
            $comments->is_liked = false;
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

        $shorts = ShortsImpressions::find($id);
        if (!$shorts) {
            return response()->json([
                "success" => false,
                "message" => "Shorts Impressions not found " . $id,
                "shorts" => $id
            ], 404);
        }

        $comment_id = Str::random(16);
        $owner_id = Auth::user()->id;
        $shorts_impressions_id = $shorts->id;

        ShortsComment::create([
            'id' => $comment_id,
            'owner_id' => $owner_id,
            'shorts_impressions_id' => $shorts_impressions_id,
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

        $comment = ShortsComment::find($id);
        if (!$comment) {
            return response()->json([
                "success" => false,
                "message" => "Shorts comment not found " . $id,
                "shorts" => $id
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

        $comment = ShortsComment::find($id);
        if (!$comment) {
            return response()->json([
                "success" => false,
                "message" => "Shorts comment not found " . $id,
                "shorts" => $id
            ], 404);
        }

        $comment->delete();

        return response()->json([
            "success" => true,
            "message" => "Comment deleted"
        ]);
    }
}
