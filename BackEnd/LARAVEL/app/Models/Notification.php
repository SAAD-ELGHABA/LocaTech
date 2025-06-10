<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = ['sender', 'receiver', 'object', 'body', 'data', 'time'];

    protected $casts = [
        'data' => 'array',
        'time' => 'datetime',
    ];
    public function senderUser()
    {
        return $this->belongsTo(User::class, 'sender');
    }

    public function receiverUser()
    {
        return $this->belongsTo(User::class, 'receiver');
    }
}
