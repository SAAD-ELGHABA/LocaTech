<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourtierController;
use App\Http\Controllers\VilleController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\Ville;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(['auth:sanctum', 'verified']);


Route::post("/login", [AuthController::class, "login"])->name("login");
Route::post("/register", [AuthController::class, "register"])->name("register");

Route::post('/courtier', [CourtierController::class, 'store'])->name('courtier.store');

Route::post('/googleAuth', [AuthController::class, 'googleAuth'])->name('googleAuth');

Route::post('/forgot-password', [AuthController::class, 'ForgetPassword']);
Route::post('/reset-password', [AuthController::class, 'ResetPassword'])->name('password.reset');

Route::get("/ville", [VilleController::class, "index"])->name("ville.index");

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json([
        'message' => 'please check your email'
    ]);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');


Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    if (!Auth::check()) {
        return response()->json(['message' => 'Unauthenticated !'], 401);
    }
    Log::info('Verifying email for ID: ' . $request->id);
    Log::info('Hash: ' . $request->hash);
    Log::info('Signature: ' . $request->query('signature'));
    $request->fulfill();
    return response()->json(['message' => 'Email verified successfully!']);
})->middleware(['auth:sanctum'])->name('verification.verify');
