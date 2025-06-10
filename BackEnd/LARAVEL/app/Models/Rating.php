<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'bien_id',
        'user_id',
        'rating',
        'comment',
    ];

    /**
     * Get the bien (property) this rating belongs to.
     */
    public function bien()
    {
        return $this->belongsTo(Bien::class);
    }

    /**
     * Get the user who left the rating.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
