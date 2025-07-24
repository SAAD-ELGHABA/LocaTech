<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'affaire_id',
        'budget_Numbre',
        'budget_Lettre',
        'Commentaire',
        'commission_locatech',
        'impôts',
        'frauis_dossier',
        'nombre_mois'
    ];
    protected static function booted()
    {
        static::creating(function ($transaction) {
            if (empty($transaction->slag)) {
                $transaction->slag = 'transaction-' . uniqid();
            }
        });
    }
    public function affaire()
    {
        return $this->belongsTo(Affaire::class);
    }
}
