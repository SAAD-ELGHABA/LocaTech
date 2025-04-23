<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BienController;
use App\Http\Controllers\CourtierController;
use App\Http\Controllers\FavoriController;
use App\Http\Controllers\VilleController;
use App\Models\Admin;
use App\Models\Agence;
use App\Models\Status;
use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\Ville;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

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
    return response()->json(['message' => 'E-mail vérifié avec succès !']);
})->middleware(['auth:sanctum'])->name('verification.verify');


Route::middleware(['auth:sanctum', 'admin'])->group(function () {});
Route::get('/recentCourtiers', [CourtierController::class, 'recentCourtiers'])->name('recentCourtiers');
Route::post('/StatusCourtiers', [CourtierController::class, 'StatusCourtiers'])->name('StatusCourtiers');


Route::post('/CreateBien', [BienController::class, 'store'])->name('CreateBien');
Route::get('/Biens', [BienController::class, 'index'])->name('Biens');
Route::post('/ActuelCourtier', [CourtierController::class, 'ActuelCourtier'])->name('ActuelCourtier');
Route::post('/delete-Bien/{id}', [BienController::class, 'delete'])->name('deleteBien');
Route::post('/brouiller-Bien/{id}', [BienController::class, 'brouiller'])->name('brouillerBien');
Route::post('/activer-Bien/{id}', [BienController::class, 'activer'])->name('activerBien');

Route::get('/status', function () {
    return Status::all();
});

Route::post('/filterBiens', [BienController::class, 'filter'])->name('filterBiens');

Route::post('/add-favoris', [FavoriController::class, 'add_to_favoris'])->name('add-favoris')->middleware('auth:sanctum');

Route::get('get-user-favoris', [FavoriController::class, 'getUserFavoris'])->name('get-user-favoris')->middleware('auth:sanctum');


Route::get('/get-users', function () {
    $users = User::where('role', 'user')->get();
    return response()->json([
        'users' => $users
    ]);
});

Route::get('/get-courtiers', function () {
    $courtiers = DB::table('courtiers')
        ->join('users', 'courtiers.user_id', '=', 'users.id')
        ->join('agences', 'courtiers.agence_id', '=', 'agences.id')
        ->select(
            'courtiers.*',
            DB::raw("CONCAT(users.nom, ' ', users.prenom) as Nom_complet"),
            'users.email as user_email',
            'users.image as courtier_image',
            'agences.agence as agence_nom',
        )
        ->get();
    return response()->json([
        'courtiers' => $courtiers
    ]);
});


Route::get('/get-agences', function () {
    $agences = Agence::all();
    return response()->json([
        'agences' => $agences
    ]);
});

Route::get('/get-admins', function () {
    $admins = DB::table('admins')
        ->join('users', 'admins.user_id', '=', 'users.id')
        ->select(
            'admins.*',
            DB::raw("CONCAT(users.nom, ' ', users.prenom) as Nom_complet"),
            'users.email as user_email'
        )
        ->get();
    return response()->json([
        'admins' => $admins
    ]);
});



Route::get('/get-commandes', function () {
    $commandes = DB::table('commandes')
        ->join('users', 'commandes.user_id', '=', 'users.id')
        ->join('biens', 'commandes.bien_id', '=', 'biens.id')
        ->select(
            'commandes.*',
            DB::raw("CONCAT(users.nom, ' ', users.prenom) as Nom_complet"),
            'users.email as user_email',
            'biens.title as bien_titre'
        )
        ->get();
    return response()->json([
        'commandes' => $commandes
    ]);
});
