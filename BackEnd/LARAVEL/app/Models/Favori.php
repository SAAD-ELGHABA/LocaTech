<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favori extends Model
{
    protected $fillable = [
        'bien_id',
        'user_id'
    ];
    public function bien()
    {
        return $this->belongsTo(Bien::class);
    }
}
