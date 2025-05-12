<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    public function agences()
    {
        return $this->hasMany(Agence::class);
    }
}
