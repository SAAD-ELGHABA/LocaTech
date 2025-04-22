<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        return Notification::where('user_id', Auth::id())->latest()->get();
    }

    public function unreadCount()
    {
        return response()->json([
            'count' => Notification::where('user_id', Auth::id())->where('read', false)->count()
        ]);
    }

    public function store(Request $request)
    {
        $notification = Notification::create([
            'user_id' => Auth::id(), // ola specify id
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return response()->json($notification, 201);
        // Création de la notification
    Notification::create([
        'user_id' => $user->id,
        'title' => 'Achat réussi',
        'body' => 'Votre achat a été confirmé ! Merci pour votre confiance.'
    ]);

    return response()->json(['message' => 'Achat et notification enregistrés']);
    }

    public function markAsRead($id)
    {
        $notification = Notification::where('id', $id)->where('user_id', Auth::id())->first();
        if ($notification) {
            $notification->update(['read' => true]);
            return response()->json(['message' => 'Read']);
        }
        return response()->json(['error' => 'Not found'], 404);
    }
}
