<?php

namespace App\Listeners;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Auth\Events\Login;

class SendEmailVerificationOnLogin
{
    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        $user = $event->user;

        // Send email verification if needed
        if ($user instanceof MustVerifyEmail && !$user->hasVerifiedEmail()) {
            $user->sendEmailVerificationNotification();
        }
    }
}
