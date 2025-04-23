<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Bien extends Model
{
    /** @use HasFactory<\Database\Factories\BienFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'budget',
        'superficier',
        'ville',
        'type',
        'images',
        'typeAffaire',
        'courtier_id',
        'status',
        'chambres',
        'salles_de_bain',
        'etage',
        'meuble',
        'slag',
    ];
    protected $casts = [
        'images' => 'array',
    ];
    public function courtier()
    {
        return $this->belongsTo(Courtier::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($bien) {
            if (empty($bien->slag)) {
                $slug = Str::slug($bien->title);
                $slug = $slug . '-' . Str::random(5);

                $existingSlug = Bien::where('slag', $slug)->exists();
                if ($existingSlug) {
                    $slug = $slug . '-' . Str::random(5);
                }

                $bien->slag = $slug;
            }
        });
    }
}
