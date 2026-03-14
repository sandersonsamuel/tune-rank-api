export function buildVerificationEmailHtml(name: string, url: string): string {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirme seu email</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f0f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:40px 48px 32px;text-align:center;border-bottom:1px solid #2a2a2a;">
              <h1 style="margin:0;font-size:28px;color:#ffffff;letter-spacing:-0.5px;">TuneRank</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 48px;">
              <h2 style="margin:0 0 16px;font-size:20px;color:#ffffff;">Olá, ${name}!</h2>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#a0a0a0;">
                Obrigado por criar sua conta no TuneRank. Para começar a avaliar músicas e álbuns, confirme seu endereço de email clicando no botão abaixo.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="border-radius:8px;background-color:#3779E3;">
                    <a href="${url}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
                      Verificar email
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;font-size:13px;color:#606060;">
                O link expira em 24 horas. Se você não criou uma conta, ignore este email.
              </p>
              <p style="margin:0;font-size:13px;color:#606060;word-break:break-all;">
                Ou acesse: <a href="${url}" style="color:#3779E3;">${url}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 48px;border-top:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0;font-size:12px;color:#404040;">© 2025 TuneRank · Todos os direitos reservados</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
