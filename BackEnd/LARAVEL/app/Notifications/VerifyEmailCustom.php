<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Illuminate\Support\Facades\URL;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Mime\Email;

class VerifyEmailCustom extends VerifyEmailBase
{
    public function toMail($notifiable)
    {
        $id = $notifiable->id;
        $hash = sha1($notifiable->getEmailForVerification());

        $frontendUrl = config('app.frontend_url', 'http://localhost:5173') . "/verify-email/$id/$hash";

        $signedUrl = URL::signedRoute('verification.verify', ['id' => $id, 'hash' => $hash]);

        $signature = parse_url($signedUrl, PHP_URL_QUERY);
        Log::info("Generated signed URL: " . $signedUrl);
        $fullUrl = $frontendUrl . '?' . $signature;
        return (new MailMessage)
            ->subject(' Confirm Your Email Address')
            ->line('Click the button below to verify your email address.')
            ->view('emails.verification_email', ['url' => $fullUrl])
            ->line('If you did not create an account, no further action is required.')
            ->salutation('Best regards, ' . config('app.name'));
    }
}
