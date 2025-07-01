<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Courtier extends Model
{
    protected $fillable = [
        'agence_id',
        'user_id',
        'status_id',
        'breve_presentation',
        'zone_activite',
        'seo',
        'annees_experience',
        'type_activite',
        'licence_professionnelle'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function agence()
    {
        return $this->belongsTo(Agence::class);
    }
    public function biens()
    {
        return $this->hasMany(Bien::class);
    }
    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
