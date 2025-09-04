import { Context } from 'hono'
import { authService } from '../services/authService'
import { RegisterUserInput } from '../schemas/auth'
import { userRepository } from '../repositories/userRepository'
import { sendConfirmationEmail, sendResetPasswordEmail } from '../services/emailService'

export const authController = {
  login: async (c: any) => {
    try {
      const { username, password } = await c.req.json();
      const result = await authService.login(username, password);
      return c.json(result, 200);
    } catch (err: any) {
      return c.json({ error: err.message }, 401);
    }
  },

  register: async (c: Context) => {
    try {
      const body = await c.req.valid('json') as RegisterUserInput
      const user = await authService.register(body)

      const BASE_URL = process.env.FRONTEND_URL || "http://localhost:3000"
      const verificationUrl = `${BASE_URL}/auth/verify?token=${user.verificationToken}`

      await sendConfirmationEmail(user.email, user.username, verificationUrl)

      return c.json({ id: user.id, username: user.username, email: user.email })
    } catch (err) {
      if (err instanceof Error && err.message === 'USERNAME_EXISTS') {
        return c.json({ error: 'Username already exists' }, 400)
      }
      if (err instanceof Error && err.message === 'EMAIL_EXISTS') {
        return c.json({ error: 'Email already exists' }, 400)
      }
      return c.json({ error: err }, 500)
    }
  },

  verify: async (c: any) => {
    const token = c.req.query("token")
    if (!token) return c.json({ error: "Missing token" }, 400)

    const user = await userRepository.findByToken(token)
    if (!user) return c.json({ error: "Invalid token" }, 400)

    await userRepository.verifyUser(user.id)

    return c.html(`
      <h1>✅ Compte vérifié avec succès !</h1>
      <p>Tu peux maintenant fermer cette page et retourner dans l'application.</p>
    `)
  },

  forgotPassword: async (c: Context) => {
    try {
      const { email } = await c.req.json() as { email: string }

      const user = await authService.requestPasswordReset(email)
      const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${user.token}`

      await sendResetPasswordEmail(email, user.token, resetUrl)

      return c.json({ message: "Password reset email sent" })
    } catch (err: any) {
      return c.json({ error: err.message || 'Failed to send reset email' }, 400)
    }
  },

  showResetPasswordPage: async (c: Context) => {
    const token = c.req.query('token') || ''
    if (!token) {
      return c.text('Missing token', 400)
    }

    const html = `
      <!doctype html>
      <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Réinitialiser le mot de passe</title>
        <style>
          body { font-family: Arial, sans-serif; background:#f7fafc; color:#111827; display:flex; align-items:center; justify-content:center; height:100vh; }
          .card { background:#fff; padding:24px; border-radius:12px; box-shadow:0 5px 20px rgba(0,0,0,0.05); width: 100%; max-width:420px; }
          input { width:100%; padding:12px; margin:8px 0; border:1px solid #e5e7eb; border-radius:8px; }
          button { width:100%; padding:12px; background:#111827; color:#fff; border:none; border-radius:8px; cursor:pointer; }
          .muted { color:#6b7280; font-size:14px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Réinitialiser votre mot de passe</h2>
          <p class="muted">Entrez votre nouveau mot de passe ci-dessous.</p>

          <form action="/auth/reset-password?token=${token}" method="POST">
            <input type="hidden" name="token" value="${token}" />
            <label>Nouveau mot de passe</label>
            <input type="password" name="password" required minlength="8" />
            <label>Confirmer le mot de passe</label>
            <input type="password" name="confirmPassword" required minlength="8" />
            <button type="submit">Modifier le mot de passe</button>
          </form>
        </div>
      </body>
      </html>
    `
    return c.html(html)
  },

  resetPassword: async (c: Context) => {
    try {
      let body: any = null
      try {
        body = await c.req.json()
      } catch (e) {
        try {
          const fd = await c.req.formData()
          body = Object.fromEntries(fd.entries())
        } catch (e2) {
          body = null
        }
      }

      if (!body) return c.json({ error: 'Request body is required' }, 400)

      const token = body.token as string
      const password = body.password as string
      const confirmPassword = body.confirmPassword as string

      if (!token) return c.json({ error: 'Missing token' }, 400)
      if (!password || !confirmPassword) return c.json({ error: 'Password fields are required' }, 400)
      if (password !== confirmPassword) return c.json({ error: 'Passwords do not match' }, 400)

      await authService.resetPassword(token, password)

      const acceptHeader = c.req.header('accept') || ''
      const isHtmlForm = typeof body === 'object' && c.req.header('content-type')?.includes('application/x-www-form-urlencoded')
      if (isHtmlForm || acceptHeader.includes('text/html')) {
        return c.html(`
          <h1>Mot de passe modifié ✅</h1>
          <p>Votre mot de passe a bien été mis à jour. Vous pouvez maintenant <a href="/auth/login">vous connecter</a>.</p>
        `)
      }

      return c.json({ message: 'Password successfully reset' })
    } catch (err: any) {
      return c.json({ error: err.message || 'Erreur' }, 400)
    }
  },

}
