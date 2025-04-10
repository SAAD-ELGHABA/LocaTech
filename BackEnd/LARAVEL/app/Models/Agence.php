<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agence extends Model
{
    protected $fillable = [
        'agence',
        'Numéro_ICE',
        'RC'
    ];
}
