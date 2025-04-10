<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Listeners\SendEmailVerificationOnLogin;
use Illuminate\Auth\Events\Login;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }
    protected $listen = [
        Login::class => [
            SendEmailVerificationOnLogin::class,
        ],
    ];
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
