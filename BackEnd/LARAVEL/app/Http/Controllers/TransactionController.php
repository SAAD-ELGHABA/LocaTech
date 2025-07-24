<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\TransactionEmail;
use App\Models\Affaire;
use App\Models\Bien;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class TransactionController extends Controller
{
    public function register(Request $request, $status)
    {
        try {
            $validation = $request->validate([
                'bienId' => 'required',
                'affaire_id' => 'required|exists:affaires,id',
                'budget_Numbre' => 'required',
                'budget_Lettre' => 'required',
                'commission_locatech' => 'required',
                'impôts' => 'required',
                'frauis_dossier' => 'required',
                'nombre_mois' => 'required',
                'Commentaire' => 'nullable',
            ]);

            DB::beginTransaction();
            if ($validation) {
                $transaction = Transaction::where('affaire_id', $validation['affaire_id'])->first();
                if ($transaction) {
                    return response()->json([
                        'message' => "Cette transaction a déjà été enregistrée"
                    ]);
                }
                $newTransaction = Transaction::create($validation);
                $bien = Bien::find($request->input('bienId'));
                $bien->status_id = $bien->typeAffaire === 'acheter' ? 9 : 10;
                $bien->save();

                $affaire = Affaire::with(['accord.user', 'accord.courtier.user'])
                    ->find($validation['affaire_id']);
                $affaire->status = $status;
                $affaire->save();
                if ($affaire && $affaire->accord) {

                    $clientUser = optional($affaire->accord->user);
                    $courtierUser = optional(optional($affaire->accord->courtier)->user);

                    if ($clientUser && $clientUser->email) {
                        Mail::to($clientUser->email)
                            ->send(new TransactionEmail($clientUser, $affaire, $newTransaction, $bien,$status));
                    }

                    if ($courtierUser && $courtierUser->email) {
                        Mail::to($courtierUser->email)
                            ->send(new TransactionEmail($courtierUser, $affaire, $newTransaction, $bien,$status));
                    }
                }

                DB::commit();
                return response()->json([
                    'message' => "Enregistré avec succès"
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ]);
        }
    }
    public function getTransactionDetails($transactionSlag)
    {
        try {
            $transaction = Transaction::where('slag', $transactionSlag)
            ->with([
                'affaire',
                'affaire.accord',
                'affaire.accord.bien',
                'affaire.accord.user',
                'affaire.accord.courtier.user',
            ])->firstOrFail();
            return response()->json([
                'transaction' => $transaction,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 404);
        }
    }
}
