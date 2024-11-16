<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShortsImpressions extends Model
{
    use HasFactory;
    protected $keyType = "string";
    protected $table = "shorts_impressions";
    public $timestamps = false;
    protected $fillable = [
        'id',
        'likes',
        'comments',
        'views',
    ];

    protected static function deleteById($id)
    {
        $impressions = self::find($id);
        $impressions->delete();
    }
}
