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

        $getInteractions = function ($model) use ($userId) {
            return $model::where('user_id', $userId)
                ->with('bien')
                ->get()
                ->filter(fn($item) => $item->bien)
                ->map(fn($item) => [
                    'bien' => $item->bien,
                    'interaction_date' => $item->created_at,
                ]);
        };

        $views = $getInteractions(BienView::class);
        $favoris = $getInteractions(Favori::class);
        $ratings = $getInteractions(Rating::class);

        $allInteractions = $views->concat($favoris)->concat($ratings);

        $grouped = $allInteractions->groupBy(fn($item) => $item['bien']->id);

        $latestPerBien = $grouped->map(function ($items) {
            return collect($items)->sortByDesc('interaction_date')->first();
        })->values();

        $lastBiens = $latestPerBien->sortByDesc('interaction_date')->take(5)->values();

        $lastBiensOnly = $lastBiens->map(fn($item) => $item['bien']);

        $types = $lastBiensOnly->map(fn($item) => $item->type)->unique()->values();
        $ville = $lastBiensOnly->map(fn($item) => $item->ville)->unique()->values();
        $typesAffaire = $lastBiensOnly->map(fn($item) => $item->typeAffaire)->unique()->values();
        $budgets = $lastBiensOnly->map(fn($item) => $item->budget)->unique()->values();
        $budgetRange = [
            'min' => $budgets->min(),
            'max' => $budgets->max(),
        ];

        $critics = [
            "types" => $types,
            "typeAffaires" => $typesAffaire,
            "ville" => $ville,
            "budgetRange" => $budgetRange,
        ];

        return response()->json([
            'critics' => $critics,
            'biens' => $lastBiensOnly,
        ]);
    }
}
