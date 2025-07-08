<?php

use App\Http\Controllers\AccordController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AffaireController;
use App\Http\Controllers\AgenceController;
use App\Http\Controllers\AiAssistantController;
use App\Http\Controllers\AssistantController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BienController;
use App\Http\Controllers\CourtierController;
use App\Http\Controllers\FavoriController;
use App\Http\Controllers\MyHistoryController;
use App\Http\Controllers\notificationController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\SignalController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\VilleController;
use App\Models\Accord;
use App\Models\Admin;
use App\Models\Agence;
use App\Models\Assistant;
use App\Models\Courtier;
use App\Models\Status;
use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\Ville;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
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
Route::get('/Biens/{limit}', [BienController::class, 'index'])->name('Biens');
Route::get('/Biens-assistant', [BienController::class, 'getBienAssistant'])->name('getBienAssistant');
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
    $courtiers = Courtier::with(['agence.evaluation', 'user', 'status'])->get();
    return response()->json([
        'courtiers' => $courtiers
    ]);
});

Route::post('/updateProfileCourtier', [CourtierController::class, 'updateProfileCourtier'])->name('updateProfileCourtier')->middleware(['auth:sanctum']);

Route::get('/get-agences', function () {
    $agences = Agence::with(['courtier.user'])->get();
    return response()->json([
        'agences' => $agences
    ]);
});

Route::get('/get-admins', function () {
    $admins = Admin::with('user')->get();
    return response()->json([
        'admins' => $admins
    ]);
});

Route::post('/updateProfile', [AuthController::class, 'updateProfile'])->name('updateProfile')->middleware(['auth:sanctum']);


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

Route::get('/get-assistants', function () {
    $assistants = Assistant::with(['user', 'status'])->get();
    return response()->json([
        'assistants' => $assistants
    ]);
});

Route::post('/store-assistant', [AssistantController::class, 'storeAssistant'])->name('storeAssistant');

Route::post('/agences/{id}/evaluation', [AgenceController::class, 'evaluation'])->name('evaluation');

Route::post('/status-bien/{id}', [BienController::class, 'statusBien'])->name('status.bien');

Route::post('/store-notifications', [notificationController::class, 'store'])->name('store.notification');

Route::get('/get-notifications', [notificationController::class, 'index'])->name('index.notifications')->middleware('auth:sanctum');

Route::get('/get-commentaires-bien/{bienId}', [RatingController::class, 'index'])->name('comments');
Route::post('/rating-bien', [RatingController::class, 'addComment'])->name('add.comment')->middleware('auth:sanctum');


Route::post('/accord-rapport', [AccordController::class, 'metterAccord'])->name('put.accord');

Route::get('/get-mes-accords', [AccordController::class, 'index'])->name('accords');

Route::get('/get-rates-biens/{limit}', [RatingController::class, 'getMostRated'])->name('most.rated');

Route::post('/bien-signal/{BienId}', [RatingController::class, 'BienSignal'])->name('signal.bien')->middleware('auth:sanctum');

Route::get('/get-bien-interactions/{BienId}', [BienController::class, 'getInteractions'])->name('get.bien.interactions');

Route::post('/biens/view', [BienController::class, 'trackView'])->name('track.view.bien')->middleware('throttle:10,1');

Route::get('/get-accord-bien/{BienId}', [AccordController::class, 'getAccordBien'])->name('getAccordBien')->middleware('auth:sanctum');


Route::get('/get-quartier-ville/{ville}', [BienController::class, 'getQuartierVille'])->name('getQuartierVille');


Route::get('/get-biens-assistant', [AssistantController::class, 'getBiens'])->name('getBiens');

Route::get('/get-signals', [SignalController::class, 'getSignals'])->name('get.signals');

Route::get('/get-accords', [AccordController::class, 'getAccords'])->name('get.accords');

Route::post('/accords/validate', [AccordController::class, 'validateAccord'])->name('validate.accord')->middleware('auth:sanctum');

Route::get('/my-history', [MyHistoryController::class, 'getTracking'])->name('getTracking')->middleware('auth:sanctum');

Route::get('/get-affaires', [AffaireController::class, 'index'])->name('get.affaires')->middleware('auth:sanctum');

Route::get("/get-affaire/{courtierId}/{clientId}/{accordId}", [AffaireController::class, 'getAffaire'])->name('get.affaire');

Route::get('/get-agences', [AgenceController::class, 'index'])->name('get.agences');

Route::post('/add-courtiers', [CourtierController::class, 'addCourtiers'])->name('add.courtiers')->middleware('auth:sanctum');

Route::post('toggle-agences', [AgenceController::class, 'toggleAgence'])->name('toggle.agence')->middleware('auth:sanctum');

Route::get('/get-evaluations', [
    'uses' => function () {
        $evaluations = DB::table('evaluations')->get();
        return response()->json([
            'evaluations' => $evaluations
        ]);
    }
])->name('get.evaluations');

Route::post('/delete-courtier/{selectedRow}', [CourtierController::class, 'deleteCourtier'])->name('delete.courtier')->middleware('auth:sanctum');

Route::post('/delete-agence/{selectedAgenceId}', [AgenceController::class, 'deleteAgence'])->name('delete.agence')->middleware('auth:sanctum');

Route::post('/handle-admins', [AdminController::class, 'handleAdmin'])->name('handle.admin')->middleware('auth:sanctum');

Route::post('/handle-user', [AdminController::class, 'handleUsers'])->name('handle.user')->middleware('auth:sanctum');

Route::post('/delete-user/{selectedUser}', [AdminController::class, 'deleteUser'])->name('delete.user')->middleware('auth:sanctum');

Route::post('/delete-admin/{selectedAdminId}', [AdminController::class, 'deleteAdmin'])->name('delete.admin')->middleware('auth:sanctum');

Route::get('/get-stats-last-month', [AdminController::class, 'lastMonthStats'])->name('get.stats')->middleware('auth:sanctum');

Route::post('/register-transaction/{status}', [TransactionController::class, 'register'])->name('register')->middleware('auth:sanctum');

Route::get('/get-bien-details/{slag}', [BienController::class, 'getDetailsBien'])->name('get.details.bien');

Route::get('/get-courtier-biens/{courtierId}', [CourtierController::class, 'getCourtierBiens'])->name('get.courtier.biens')->middleware('auth:sanctum');

Route::post('/ai-assistant', [AiAssistantController::class, 'handle'])->name('handle');


Route::get('/verify-key', function () {
    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY')
    ])->get('https://openrouter.ai/api/v1/auth/key');

    return $response->json();
});

Route::get('/check-models', function () {
    return Http::withHeaders([
        'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY')
    ])->get('https://openrouter.ai/api/v1/models')->json();
});

Route::get('/check-credits', function () {
    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY')
    ])->get('https://openrouter.ai/api/v1/auth/key');

    return [
        'credits_remaining' => $response->json()['data']['credits'] ?? null,
        'subscription' => $response->json()['data']['subscription'] ?? null
    ];
});

Route::get('/account-status', function () {
    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY')
    ])->get('https://openrouter.ai/api/v1/auth/status');

    return $response->json();
});
