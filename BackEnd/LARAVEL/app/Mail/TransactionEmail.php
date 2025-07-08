<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TransactionEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $affaire;
    public $receiver;
    public $transaction;
    public $bien;
    public $status;
    public $frontUrl;
    /**
     * Create a new message instance.
     */
    public function __construct($receiver, $affaire, $transaction, $bien, $status)
    {
        $this->receiver = $receiver;
        $this->affaire = $affaire;
        $this->transaction = $transaction;
        $this->bien = $bien;
        $this->status = $status;
        $this->frontUrl = env('APP_URL_FRONT_END');
    }


    public function build()
    {
        return $this->subject(`Transaction réussie`)
            ->view('emails.transaction_email');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Transaction Email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.transaction_email',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
