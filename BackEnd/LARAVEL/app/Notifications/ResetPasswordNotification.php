<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
    public $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $email = $this->user->email;
        $token = app('auth.password.broker')->createToken($this->user);

        $frontendUrl = 'http://localhost:5173/reset-password?token=' . $token . "&email=" . $email;

        return (new MailMessage)
            ->subject('Password Reset Request')
            ->greeting('Hello ' . $this->user->name . ',')
            ->line('We received a password reset request for your account.')
            ->view('emails.reset_password',["url"=>$frontendUrl])
            ->salutation('Best regards, ' . config('app.name'));
    }
}
