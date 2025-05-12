<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agence extends Model
{
    protected $fillable = [
        'agence',
        'Numéro_ICE',
        'RC',
        'evaluation_id'
    ];
    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class);
    }

    public function courtier()
    {
        return $this->hasMany(Courtier::class);
    }
}
