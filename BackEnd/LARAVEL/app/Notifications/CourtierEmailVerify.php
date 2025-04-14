<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;

class CourtierEmailVerify extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        $id = $notifiable->id;
        $hash = sha1($notifiable->getEmailForVerification());

        $frontendUrl = config('app.frontend_url', 'http://localhost:5173') . "/verify-email/$id/$hash";

        $signedUrl = URL::signedRoute('verification.verify', ['id' => $id, 'hash' => $hash]);
        $password = $notifiable->password;
        $signature = parse_url($signedUrl, PHP_URL_QUERY);
        Log::info("Generated signed URL: " . $signedUrl);
        $fullUrl = $frontendUrl . '?' . $signature;
        return (new MailMessage)
            ->subject(' Confirm Your Email Address')
            ->line('Click the button below to verify your email address.')
            ->view('emails.verification_email', ['url' => $fullUrl, 'password' => $password])
            ->line('If you did not create an account, no further action is required.')
            ->salutation('Best regards, ' . config('app.name'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
