<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        try {
            $userID = Auth::id();
            if (!$userID) {
                return response()->json([
                    'message' => 'Utilisateur non authentifié.'
                ], 401);
            }

            $notifications = Notification::where("receiver", $userID)
                ->orderBy('created_at', 'desc')
                ->get();

            if (!$notifications) {
                return response()->json([
                    'message' => 'pas de notification à ce moment!'
                ]);
            }
            return response()->json([
                'message' => "des notifications sont trouvé",
                "notifications" => $notifications
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to fetch notification',
                'error'   => $th->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'sender'   => 'nullable|exists:users,id',
                'receiver' => 'required|exists:users,id',
                'object'   => 'required|string|max:255',
                'body'     => 'nullable|string',
                'data'     => 'nullable|array',
                'time'     => 'nullable|date',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            // Create notification
            $notification = Notification::create([
                'sender'   => $request->sender,
                'receiver' => $request->receiver,
                'object'   => $request->object,
                'body'     => $request->body,
                'data'     => $request->data,
                'time'     => $request->time ?? now(),
            ]);

            return response()->json([
                'message' => 'Notification stored successfully',
                'notification' => $notification
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to store notification',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
