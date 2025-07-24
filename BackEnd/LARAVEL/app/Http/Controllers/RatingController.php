<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bien;
use App\Models\Courtier;
use App\Models\Rating;
use App\Models\Signal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function index($bienId)
    {
        $comments = Rating::with('user')
            ->where('bien_id', $bienId)
            ->where('status', 'active') // Assuming you want to filter by active status
            ->orderByDesc('created_at')
            ->get();
        $bien = Bien::where('id', $bienId)->first();
        $bienOwner = Courtier::where('id', $bien->courtier_id)->with('user')->first();
        return response()->json([
            'commentaires' => $comments,
            'bienOwner' => $bienOwner,
            'bien' => $bien
        ]);
    }


    public function addComment(Request $request)
    {
        $validated = $request->validate([
            'bien_id' => 'required|exists:biens,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $rating = Rating::create([
            'bien_id' => $validated['bien_id'],
            'user_id' => Auth::id(),
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return response()->json([
            'message' => 'Commentaire ajouté avec succès.',
            'rating' => $rating->load('user'),
        ], 201);
    }

    public function getMostRated($limit)
    {
        $mostRated = Bien::with(['rating', 'courtier'])
            ->whereIn('status_id', [1, 5, 7])
            ->get();

        $mostRated = $mostRated->map(function ($b) {
            $b->avg_rating = $b->rating->avg('rating') ?? 0;
            return $b;
        });

        $mostRated = $mostRated->sortByDesc('avg_rating');

        $mostRated = $mostRated->take($limit)->values();

        return response()->json([
            'mostRated' => $mostRated
        ]);
    }

    public function BienSignal(Request $request, $BienId)
    {
        $validated = $request->validate([
            'subject' => 'sometimes|string|max:255',
            'precision' => 'sometimes|string',
        ]);

        $signal = Signal::create([
            'bien_id' => $BienId,
            'user_id' => Auth::user()->id,
            'subject' => $validated['subject'] ?? null,
            'precision' => $validated['precision'] ?? null,
        ]);

        return response()->json([
            'message' => 'Signal created successfully',
            'signal' => $signal
        ], 201);
    }


    public function getComments()
    {
        $comments = Rating::with('user', 'bien')
            ->orderBy('created_at', 'desc')->paginate(30);
        return response()->json([
            'comments' => $comments,
        ]);
    }


    public function toggleAction($commentId, $action)
    {
        $rating = Rating::findOrFail($commentId);
        if ($action === 'active') {
            $rating->status = 'active';
            $rating->save();
        } elseif ($action === 'inactive') {
            $rating->status = 'inactive';
            $rating->save();
        } else {
            $rating->delete();
        }

        return response()->json([
            'message' => 'Action effectuée avec succès',
        ]);
    }
}
