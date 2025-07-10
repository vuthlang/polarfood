import { Context } from 'hono'
import { authService } from '../services/authService'
import { RegisterUserInput } from '../schemas/user'

export const authController = {
  register: async (c: Context) => {
    try {
      const body = await c.req.valid('json') as RegisterUserInput
      const user = await authService.register(body)
      return c.json({ id: user.id, username: user.username, email: user.email })
    } catch (err) {
      if (err instanceof Error && err.message === 'EMAIL_EXISTS') {
        return c.json({ error: 'Email already in use' }, 400)
      }
      return c.json({ error: err }, 500)
    }
  },
}
