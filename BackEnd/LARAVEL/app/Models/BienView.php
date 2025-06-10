<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BienView extends Model
{
    protected $fillable = [
        'bien_id',
        'user_id',
        'ip_address',
        'user_agent'
    ];
    protected $hidden = [
        'ip_address',
        'user_agent'
    ];
    public function bien()
    {
        return $this->belongsTo(Bien::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
