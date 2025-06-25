<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Affaire extends Model
{
    protected $fillable = [
        'accord_id',
        'assistant_id',
        'status',
    ];
}
