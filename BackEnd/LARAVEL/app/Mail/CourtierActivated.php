<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CourtierActivated extends Mailable
{
    use Queueable, SerializesModels;

    public $courtier;
    public $token;

    public function __construct($courtier, $token)
    {
        $this->courtier = $courtier;
        $this->token = $token;
    }

    public function build()
    {
        return $this->subject('Votre compte a été activé')
            ->view('emails.courtier_activated')
        ;
    }
}
