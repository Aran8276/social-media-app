<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostComment extends Model
{
    use HasFactory;
    protected $keyType = "string";
    protected $table = "post_comments";
    protected $fillable = [
        'id',
        'owner_id',
        'post_impressions_id',
        'comment',
        'likes',
        'created_at',
        'updated_at',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
