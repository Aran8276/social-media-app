<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\PostMedia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\PostImpressions;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Posts::with(['media', 'impressions'])->get();
        $user = Auth::user();

        if ($user) {
            $liked_contents = json_decode($user->liked_contents);

            $posts->each(function ($post) use ($liked_contents) {
                $post->is_liked = in_array($post->post_impressions_id, $liked_contents);
            });

            return response()->json([
                "success" => true,
                "message" => "Showing all posts",
                "posts" => $posts
            ]);
        }

        $posts->each(function ($post) {
            $post->is_liked = false;
        });

        return response()->json([
            "success" => true,
            "message" => "Showing all posts",
            "posts" => $posts
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|max:4096',
            'visibility' => 'required|in:public,private',
            'photos.*' => 'file|mimes:jpg,png,jpeg,gif',
            'videos.*' => 'file|mimes:mp4',
        ]);

        $posts_id = Str::random(16);
        $owner_id = Auth::user()->id;
        $media_id = Str::random(16);
        $impressions_id = Str::random(16);

        PostMedia::create([
            'id' => $media_id,
            'images' => json_encode([]),
            'videos' => json_encode([]),
        ]);

        PostImpressions::create([
            'id' => $impressions_id,
            'likes' => 0,
            'views' => 0,
        ]);

        if ($request->hasFile("photos")) {
            PostMedia::uploadImage($request->file("photos"), $media_id);
        };

        if ($request->hasFile("videos")) {
            PostMedia::uploadVideo($request->file("videos"), $media_id);
        }

        Posts::create([
            'id' => $posts_id,
            'owner_id' => $owner_id,
            'post_media_id' => $media_id,
            'post_impressions_id' => $impressions_id,
            'content' => $request->content,
            'visibility' => $request->visibility,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            "success" => true,
            "message" => "Post created " . $posts_id,
            "post" => $posts_id
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|max:4096',
            'visibility' => 'required|in:public,private',
        ]);
        $form = [
            "content" => $request->content,
            "visibility" => $request->visibility,
        ];
        $post = Posts::updateById($id, $form);

        if (!$post) {
            return response()->json([
                "success" => false,
                "message" => "Post not found " . $id,
                "post" => $id
            ], 404);
        }
        return response()->json([
            "success" => true,
            "message" => "Post updated " . $id,
            "post" => $id
        ]);
    }

    public function delete($id)
    {
        $post = Posts::deleteById($id);
        if (!$post) {
            return response()->json([
                "success" => false,
                "message" => "Post not found " . $id,
                "post" => $id
            ], 404);
        }
        return response()->json([
            "success" => true,
            "message" => "Post deleted " . $id,
            "post" => $id
        ], 200);
    }

    public function showById($id)
    {
        $post = Posts::find($id);

        if (!$post) {
            return response()->json([
                "success" => false,
                "message" => "Post not found " . $id,
                "post" => $id
            ], 404);
        }

        $user = Auth::user();

        $data = $post->with(['media', 'impressions'])->first();
        $data->is_liked = in_array($post->post_impressions_id, $user->liked_contents);
        return response()->json([
            "success" => true,
            "message" => "Showing post of " . $id,
            "post" => $data,
        ], 200);
    }
}
