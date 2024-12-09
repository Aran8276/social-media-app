<?php

namespace App\Http\Controllers;

use App\Models\Shorts;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ShortsImpressions;
use Illuminate\Support\Facades\Auth;

class ShortsController extends Controller
{
    public function index()
    {
        $shorts = Shorts::with(['impressions', 'user'])->get();
        $user = Auth::user();

        if ($user) {
            $liked_contents = json_decode($user->liked_contents, true);

            $shorts->each(function ($shorts) use ($liked_contents) {
                $shorts->is_liked = in_array($shorts->shorts_impressions_id, $liked_contents);
            });

            return response()->json([
                "success" => true,
                "message" => "Showing all shorts",
                "shorts" => $shorts
            ]);
        }

        $shorts->each(function ($shorts) {
            $shorts->is_liked = false;
        });

        return response()->json([
            "success" => true,
            "message" => "Showing all shorts",
            "shorts" => $shorts
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'visibility' => 'required|in:public,private,unlisted',
            'video.*' => 'file|mimes:mp4|required',
        ]);

        if (!$request->hasFile("video")) {
            return response()->json([
                "success" => false,
                "message" => "Video is required.",
            ], 400);
        }

        $shorts_id = Str::random(16);
        $owner_id = Auth::user()->id;
        $impressions_id = Str::random(16);
        $video = Shorts::uploadVideo($request->file("video"), $shorts_id);

        if (!$video) {
            return response()->json([
                "success" => false,
                "message" => "Error whilst uploading the video.",
            ], 400);
        }

        ShortsImpressions::create([
            'id' => $impressions_id,
            'likes' => 0,
            'views' => 0,
        ]);

        Shorts::create([
            'id' => $shorts_id,
            'owner_id' => $owner_id,
            'shorts_impressions_id' => $impressions_id,
            'title' => $request->title,
            'visibility' => $request->visibility,
            'video' => $video,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            "success" => true,
            "message" => "Shorts created " . $shorts_id,
            "shorts" => $shorts_id
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|max:255',
            'visibility' => 'required|in:public,private,unlisted',
        ]);
        $form = [
            "title" => $request->title,
            "visibility" => $request->visibility,
        ];
        $shorts = Shorts::updateById($id, $form);

        if (!$shorts) {
            return response()->json([
                "success" => false,
                "message" => "Shorts not found " . $id,
                "shorts" => $id
            ], 404);
        }
        return response()->json([
            "success" => true,
            "message" => "Shorts updated " . $id,
            "shorts" => $id
        ]);
    }

    public function delete($id)
    {
        $shorts = Shorts::deleteById($id);

        if (!$shorts) {
            return response()->json([
                "success" => false,
                "message" => "Shorts not found " . $id,
                "shorts" => $id
            ], 404);
        }
        return response()->json([
            "success" => true,
            "message" => "Shorts deleted " . $id,
            "shorts" => $id
        ], 200);
    }

    public function showById($id)
    {
        $shorts = Shorts::find($id);

        if (!$shorts) {
            return response()->json([
                "success" => false,
                "message" => "Shorts not found " . $id,
                "shorts" => $id
            ], 404);
        }

        $user = Auth::user();

        if ($user) {
            $data = $shorts->with(['impressions'])->first();
            $data->is_liked = in_array($shorts->shorts_impressions_id, json_decode($user->liked_contents, true));
            return response()->json([
                "success" => true,
                "message" => "Showing shorts of " . $id,
                "shorts" => $data,
            ], 200);
        }

        $data = $shorts->with(['impressions'])->first();
        $data->is_liked = false;
        return response()->json([
            "success" => true,
            "message" => "Showing shorts of " . $id,
            "shorts" => $data,
        ], 200);
    }
}
