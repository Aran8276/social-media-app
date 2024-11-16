<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;
    protected $keyType = 'string';
    protected $table = 'posts';
    protected $fillable = [
        'id',
        'owner_id',
        'post_media_id',
        'post_impressions_id',
        'content',
        'visibility',
        'created_at',
        'updated_at',
    ];

    protected static function updateById($id, $data)
    {
        $posts = self::find($id);
        if (!$posts) {
            return false;
        }

        $posts->update($data);
        return true;
    }

    protected static function deleteById($id)
    {
        $posts = self::find($id);
        if (!$posts) {
            return false;
        }
        $post_media_id = $posts->post_media_id;
        $post_impressions_id = $posts->post_impressions_id;
        $posts->delete();
        PostMedia::deleteById($post_media_id);
        PostImpressions::deleteById($post_impressions_id);
        return true;
    }


    public function media()
    {
        return $this->belongsTo(PostMedia::class, 'post_media_id');
    }

    public function impressions()
    {
        return $this->belongsTo(PostImpressions::class, 'post_impressions_id');
    }
}
