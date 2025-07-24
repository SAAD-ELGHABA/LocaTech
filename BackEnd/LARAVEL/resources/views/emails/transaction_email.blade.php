<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Transaction réussie</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head>

<body style="margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #f9fafb;">
    <table align="center" width="600" cellpadding="0" cellspacing="0"
        style="background: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">

        <tr>
            <td style="text-align: center; padding: 5px;">
                <img src="https://res.cloudinary.com/dmiaxmuiy/image/upload/v1751898387/logo-locatech-v1_ztxfrg.png"
                    alt="Locatech Logo"
                    style="max-width: 100px; height: auto;">
            </td>
        </tr>

        <tr>
            <td>
                <h1 style="margin: 0; font-size: 20px; font-weight: 700;">
                    {{$status}}
                </h1>
            </td>
        </tr>

        @if(isset($bien->images) && count($bien->images) > 0)
        <tr>
            <td style="text-align: center;">
                <img src="{{ $bien->images[0] }}" alt="Image principale du bien"
                    style="max-width: 100%; border-radius: 6px; margin-top: 15px;">
            </td>
        </tr>

        @if(count($bien->images) > 1)
        <tr>
            <td style="padding: 20px 0 0 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                    <tr>
                        @foreach(array_slice($bien->images, 1) as $index => $image)
                        <td style="padding: 4px;" width="33.33%">
                            <img src="{{ $image }}" alt="Image {{ $index + 2 }}"
                                style="width: 100%; height: auto; border-radius: 4px;">
                        </td>
                        @if(($index + 1) % 3 === 0 && !$loop->last)
                    </tr>
                    <tr>
                        @endif
                        @endforeach
                    </tr>
                </table>
            </td>
        </tr>
        @endif
        @endif


        <tr>
            <td style="padding: 40px 10px;">
                <p style="font-size: 16px; color: #111827; margin: 0 0 16px 0;">
                    Bonjour <strong>{{ $receiver->prenom }} {{ $receiver->nom }}</strong>,
                </p>

                <p style="font-size: 16px; color: #374151; margin: 0 0 16px 0; line-height: 1.5;">
                    Nous vous confirmons que la transaction pour l'affaire <strong>#{{ $affaire->id }}</strong> a été enregistrée avec status de {{$status}}.
                </p>
                <p>
                    Le commentaire de l'administrateur : <strong>
                        {{$transaction->Commentaire}}
                    </strong>
                </p>
                @if($status !== 'Transaction non réussie')
                <p style="font-size: 16px; color: #374151; margin: 0 0 24px 0;">
                    Voici un résumé :
                </p>

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="font-size: 15px; color: #374151; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong>Budget :</strong>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                            {{ number_format($transaction->budget_Numbre, 0, ',', ' ') }} MAD ({{ ucfirst($transaction->budget_Lettre) }})
                        </td>
                    </tr>

                    @if($bien->typeAffaire === 'louer')
                    <tr>
                        <td style="padding: 8px 0;"><strong>Nombre de mois :</strong></td>
                        <td style="padding: 8px 0;">{{ $transaction->nombre_mois }}</td>
                    </tr>
                    @endif
                </table>

                <p style="text-align: center; margin: 32px 0;">
                    <a href="{{ $frontUrl }}transactions/{{ $transaction->slag }}"
                        style="background-color: #ef4444; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; display: inline-block;">
                        Consulter ma transaction
                    </a>

                </p>
                @endif
                <p style="font-size: 12px; color: #374151; margin: 24px 0 16px 0; line-height: 1.5;">
                    Notre équipe reste à votre disposition pour toute question ou information complémentaire.
                </p>

                <p style="font-size: 12px; color: #374151; margin: 0;">
                    Merci pour votre confiance,<br>
                    L'équipe <span style="color: #ef4444; font-weight: 600;">Locatech</span>.
                </p>
            </td>
        </tr>

        <tr>
            <td style="background-color: #f3f4f6; text-align: center; padding: 24px;">
                <p style="margin: 0 0 12px 0;">
                    <a href="https://facebook.com" style="margin: 0 8px; display: inline-block;">
                        <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000"
                            width="24" alt="Facebook" style="vertical-align: middle;max-width: 25px;">
                    </a>
                    <a href="https://instagram.com" style="margin: 0 8px; display: inline-block;">
                        <img src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000"
                            width="24" alt="Instagram" style="vertical-align: middle;max-width: 25px;">
                    </a>
                    <a href="https://linkedin.com" style="margin: 0 8px; display: inline-block;">
                        <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000"
                            width="24" alt="LinkedIn" style="vertical-align: middle;max-width: 25px;">
                    </a>
                    <a href="https://twitter.com" style="margin: 0 8px; display: inline-block;">
                        <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000"
                            width="24" alt="Twitter" style="vertical-align: middle;max-width: 25px;">
                    </a>
                </p>


                <p style="font-size: 12px; color: #6b7280; margin: 8px 0;">
                    <a href="#" style="color: #6b7280; text-decoration: none; margin: 0 8px;">Politique de confidentialité</a> |
                    <a href="#" style="color: #6b7280; text-decoration: none; margin: 0 8px;">Conditions d'utilisation</a>
                </p>

                <p style="font-size: 12px; color: #6b7280; margin: 8px 0;">
                    &copy; {{ date('Y') }} Locatech. Tous droits réservés.
                </p>
            </td>
        </tr>
    </table>
</body>

</html>