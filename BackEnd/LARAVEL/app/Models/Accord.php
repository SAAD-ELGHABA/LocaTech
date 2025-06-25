<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accord extends Model
{
    protected $fillable = ['status', 'commentaire', 'bienId', 'courtierId', 'user_id'];

    public function bien()
    {
        return $this->belongsTo(Bien::class, 'bienId');
    }

    public function courtier()
    {
        return $this->belongsTo(Courtier::class, 'courtierId');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function affaires()
    {
        return $this->hasOne(Affaire::class, 'accord_id');
    }
}
