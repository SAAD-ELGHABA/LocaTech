<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BienView;
use App\Models\Favori;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MyHistoryController extends Controller
{
    public function getTracking()
    {
        $userId = Auth::id();

        $getBiens = function ($model) use ($userId) {
            return $model::where('user_id', $userId)
                ->with('bien')
                ->get()
                ->map(fn($item) => $item->bien);
        };

        $views = $getBiens(BienView::class);
        $favoris = $getBiens(Favori::class);
        $ratings = $getBiens(Rating::class);

        $allBiens = $views->concat($favoris)->concat($ratings);

        $uniqueBiens = $allBiens->unique('id')->values();

        $lastBiens = $uniqueBiens
            ->sortByDesc('created_at') 
            ->take(5)
            ->values();


        $types = $lastBiens->map(fn($item) => $item->type)->unique()->values();
        $ville = $lastBiens->map(fn($item) => $item->ville)->unique()->values();
        $typesAffaire = $lastBiens->map(
            fn($item) => $item->typeAffaire
        )->unique()->values();
        $budgets = $lastBiens->map(fn($item) => $item->budget)->unique()->values();
        $budgetRange = [
            'min' => $budgets->min(),
            'max' => $budgets->max()
        ];

        $critics = [
            "types" => $types,
            "typeAffaires" => $typesAffaire,
            "ville" => $ville,
            "budgetRange" => $budgetRange
        ];

        return response()->json([
            'critics' => $critics
        ]);
    }
}
