import { Context } from 'hono'
import { authService } from '../services/authService'
import { RegisterUserInput } from '../schemas/user'
import { userRepository } from '../repositories/userRepository'
import { sendConfirmationEmail } from '../services/emailService'

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
        return c.json({ error: 'Ce nom d\'utilisateur est déjà utilisé.' }, 400)
      }
      if (err instanceof Error && err.message === 'EMAIL_EXISTS') {
        return c.json({ error: 'Cet email est déjà utilisé.' }, 400)
      }
      return c.json({ error: err }, 500)
    }
  },

  verify: async (c: any) => {
    const token = c.req.query("token")
    if (!token) return c.json({ error: "Token manquant" }, 400)

    const user = await userRepository.findByToken(token)
    if (!user) return c.json({ error: "Token invalide" }, 400)

    await userRepository.verifyUser(user.id)

    return c.html(`
      <h1>✅ Compte vérifié avec succès !</h1>
      <p>Tu peux maintenant fermer cette page et retourner dans l'application.</p>
    `)
  },
}
