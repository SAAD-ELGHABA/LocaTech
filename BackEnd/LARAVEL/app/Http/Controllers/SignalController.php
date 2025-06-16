<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Signal;
use Illuminate\Http\Request;

class SignalController extends Controller
{
    public function getSignals()
    {
        $signals = Signal::with(['user', 'bien'])->get();
        return $signals;
    }
}
