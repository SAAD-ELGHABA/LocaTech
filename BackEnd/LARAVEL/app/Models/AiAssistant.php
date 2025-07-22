<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiAssistant extends Model
{
    protected $fillable = [
        "user_id",
        "role",
        "content",
        "data"
    ];
    protected $casts = [
        'data' => 'array',
    ];
}
