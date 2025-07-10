import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { authController } from '../controllers/authController'
import { registerUserSchema } from '../schemas/user'

const auth = new Hono()

auth.post('/register', zValidator('json', registerUserSchema), authController.register)

export default auth