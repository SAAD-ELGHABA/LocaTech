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
}
