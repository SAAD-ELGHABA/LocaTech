<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post("/login", [AuthController::class, "login"])->name("login");
Route::post("/register", [AuthController::class, "register"])->name("register");

Route::post('/forgot-password', [AuthController::class, 'ForgetPassword']);
Route::post('/reset-password', [AuthController::class, 'ResetPassword'])->name('password.reset');
