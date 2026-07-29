<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserRegistered extends Mailable
{
    use Queueable, SerializesModels;

    public $user; // Hacemos pública la variable para usarla en el HTML

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('¡Bienvenido a Red Vital!')
                    ->view('emails.user_registered'); // Esta es la ruta del HTML
    }
}
