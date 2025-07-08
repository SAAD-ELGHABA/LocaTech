<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Réinitialisation de mot de passe</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head>

<body style="margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #f9fafb;">

    <table align="center" width="600" cellpadding="0" cellspacing="0"
        style="background: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">

        <tr>
            <td style="text-align: center; padding: 32px 24px 0 24px;">
                <img src="https://res.cloudinary.com/dmiaxmuiy/image/upload/v1751898387/logo-locatech-v1_ztxfrg.png"
                    alt="Locatech Logo" style="max-width: 180px; height: auto;">
            </td>
        </tr>

        <tr>
            <td style="background-color: #10b981; padding: 24px 40px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">
                    Réinitialisez votre mot de passe
                </h1>
            </td>
        </tr>

        <tr>
            <td style="padding: 40px;">
                <p style="font-size: 16px; color: #111827; margin: 0 0 16px 0;">
                    Bonjour,
                </p>

                <p style="font-size: 16px; color: #374151; margin: 0 0 16px 0; line-height: 1.5;">
                    Nous avons reçu une demande de réinitialisation de votre mot de passe.
                </p>

                <p style="font-size: 16px; color: #374151; margin: 0 0 24px 0;">
                    Si vous êtes à l'origine de cette demande, cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe. Si vous n'avez pas fait cette demande, ignorez simplement ce message.
                </p>

                <p style="text-align: center; margin: 32px 0;">
                    <a href="{{ $url }}"
                        style="background-color: #10b981; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; display: inline-block;">
                        Réinitialiser mon mot de passe
                    </a>
                </p>

                <p style="font-size: 16px; color: #374151; margin: 0;">
                    Merci,<br>
                    L'équipe <span style="color: #10b981; font-weight: 600;">Locatech</span>.
                </p>
            </td>
        </tr>

        <tr>
            <td style="background-color: #f3f4f6; text-align: center; padding: 24px;">
                <p style="margin: 0 0 12px 0;">
                    <a href="https://facebook.com" style="margin: 0 8px; display: inline-block;">
                        <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000"
                            width="24" alt="Facebook" style="vertical-align: middle; max-width: 25px;">
                    </a>
                    <a href="https://instagram.com" style="margin: 0 8px; display: inline-block;">
                        <img src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000"
                            width="24" alt="Instagram" style="vertical-align: middle; max-width: 25px;">
                    </a>
                    <a href="https://linkedin.com" style="margin: 0 8px; display: inline-block;">
                        <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000"
                            width="24" alt="LinkedIn" style="vertical-align: middle; max-width: 25px;">
                    </a>
                    <a href="https://twitter.com" style="margin: 0 8px; display: inline-block;">
                        <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000"
                            width="24" alt="Twitter" style="vertical-align: middle; max-width: 25px;">
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
