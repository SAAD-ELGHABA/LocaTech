<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Courtier extends Model
{
    protected $fillable = [
        'agence_id',
        'user_id',
        'status'
    ];
}
