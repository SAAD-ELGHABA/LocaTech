<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Signal extends Model
{
    protected $fillable = [
        'bien_id',
        'user_id',
        'subject',
        'precision'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function bien()
    {
        return $this->belongsTo(Bien::class);
    }
}
