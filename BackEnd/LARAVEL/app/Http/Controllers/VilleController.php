<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ville;
use Illuminate\Http\Request;

class VilleController extends Controller
{
    public function index()
    {
        $villes = Ville::all();
        return response()->json([
            'villes' => $villes
        ]);
    }
}
