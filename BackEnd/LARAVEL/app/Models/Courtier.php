<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Courtier extends Model
{
    protected $fillable = [
        'agence_id',
        'user_id',
        'status_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function agence()
    {
        return $this->belongsTo(Agence::class);
    }
}
