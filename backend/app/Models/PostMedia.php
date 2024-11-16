<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PostMedia extends Model
{
    use HasFactory;
    protected $keyType = "string";
    protected $table = "post_media";
    public $timestamps = false;
    protected $fillable = [
        'id',
        'images',
        'videos',
    ];

    protected static function deleteById($id)
    {
        $media = self::find($id);
        $images = json_decode($media->images);
        $videos = json_decode($media->videos);

        Storage::disk('public')->delete($images);
        Storage::disk('public')->delete($videos);

        $media->delete();
    }

    protected static function uploadImage($data, $id)
    {
        $media = self::find($id);
        $paths = [];
        foreach ($data as $file) {
            $path = $file->store('/uploads', "public");
            $paths[] = $path;
        }
        $media->images = json_encode($paths);
        $media->save();
    }

    protected static function uploadVideo($data, $id)
    {
        $media = self::find($id);
        $paths = [];
        foreach ($data as $file) {
            $path = $file->store('/uploads', "public");
            $paths[] = $path;
        }
        $media->videos = json_encode($paths);
        $media->save();
    }
}
