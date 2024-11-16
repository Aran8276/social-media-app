<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShortsComment extends Model
{
    use HasFactory;
    protected $keyType = "string";
    protected $table = "shorts_comments";
    protected $fillable = [
        'id',
        'owner_id',
        'shorts_impressions_id',
        'comment',
        'likes',
        'created_at',
        'updated_at',
    ];
}
