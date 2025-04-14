<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bien extends Model
{
    /** @use HasFactory<\Database\Factories\BienFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'budget',
        'superficier',
        'mapUrl',
        'ville',
        'type',
        'images',
        'typeAffaire',
        'courtier_id',
        'status'
    ];
    protected $casts = [
        'images' => 'array',
    ];
    public function courtier()
    {
        return $this->belongsTo(Courtier::class);
    }
}
