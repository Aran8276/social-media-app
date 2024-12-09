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
    public function incrementView()
    {
        $posts = Posts::with(['impressions'])->orderBy('created_at', 'desc')->get();

        $posts->each(function ($post) {
            $postImpression = $post->impressions;
            if ($postImpression) {
                $postImpression->increment('views');
            }
        });

        return response()->json([
            "success" => true,
            "message" => "Showing all posts",
            "posts" => $posts
        ]);
    }


    public function index()
    {
        $posts = Posts::with(['media', 'impressions', 'user'])->orderBy('created_at', 'desc')->get();
        $user = Auth::user();

        if ($user) {
            $liked_contents = json_decode($user->liked_contents, true);

            $posts->each(function ($post) use ($liked_contents, $user) {
                $post->is_liked = in_array($post->post_impressions_id, $liked_contents);
                if ($post->owner_id == $user->id) {
                    $post->is_owned = true;
                } else {
                    $post->is_owned = false;
                }
            });

            return response()->json([
                "success" => true,
                "message" => "Showing all posts",
                "posts" => $posts
            ]);
        }

        $posts->each(function ($post) {
            $post->is_liked = false;
            $post->is_owned = false;
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

        $owner_id = Auth::user()->id;
        if (Posts::find($id)->owner_id !== $owner_id) {
            return response()->json([
                "success" => false,
                "message" => "You do not have permissions to edit: " . $id,
                "post" => $id
            ], 403);
        }

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
        $owner_id = Auth::user()->id;
        if (Posts::find($id)->owner_id !== $owner_id) {
            return response()->json([
                "success" => false,
                "message" => "You do not have permissions to delete: " . $id,
                "post" => $id
            ], 403);
        }

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
        $user = Auth::user();

        if (!$post) {
            return response()->json([
                "success" => false,
                "message" => "Post not found " . $id,
                "post" => $id
            ], 404);
        }

        if ($user) {
            $data = $post->with(['media', 'impressions', 'user'])->where("id", $id)->first();
            $data->is_liked = in_array($post->post_impressions_id, json_decode($user->liked_contents, true));
            if ($post->owner_id == $user->id) {
                $data->is_owned = true;
            } else {
                $data->is_owned = false;
            }
            return response()->json([
                "success" => true,
                "message" => "Showing post of " . $id,
                "post" => $data,
            ], 200);
        }

        $data = $post->with(['media', 'impressions', 'user'])->where("id", $id)->first();
        $data->is_liked = false;

        return response()->json([
            "success" => true,
            "message" => "Showing post of " . $id,
            "post" => $data,
        ], 200);
    }
}
