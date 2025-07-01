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

    public function accord()
    {
        return $this->belongsTo(Accord::class, 'accord_id');
    }

    public function assistant()
    {
        return $this->belongsTo(User::class, 'assistant_id');
    }
}
