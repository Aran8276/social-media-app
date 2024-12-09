<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Shorts extends Model
{
    use HasFactory;
    protected $keyType = "string";
    protected $table = "shorts";
    protected $fillable = [
        'id',
        'owner_id',
        'shorts_impressions_id',
        'title',
        'video',
    ];

    protected static function updateById($id, $data)
    {
        $shorts = self::find($id);
        if (!$shorts) {
            return false;
        }

        $shorts->update($data);
        return true;
    }

    protected static function deleteById($id)
    {
        $shorts = self::find($id);
        if (!$shorts) {
            return false;
        }

        Storage::disk('public')->delete($shorts->video);

        $shorts->delete();
        return true;
    }

    protected static function uploadVideo($data)
    {
        $path = $data->store('/uploads', "public");
        if (!$path) {
            return false;
        }

        return $path;
    }

    public function impressions()
    {
        return $this->belongsTo(ShortsImpressions::class, 'shorts_impressions_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
