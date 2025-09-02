import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { authController } from '../controllers/authController'
import { registerUserSchema } from '../schemas/auth'

const auth = new Hono()

auth.post('/register', zValidator('json', registerUserSchema), authController.register)
auth.get('/reset-password', authController.showResetPasswordPage)
auth.get('/verify', authController.verify)
// auth.post('/forgot-password', zValidator('json', forgotPasswordSchema), authController.forgotPassword);
auth.post('/forgot-password', authController.forgotPassword);
// auth.get('/reset-password', zValidator('json', resetPasswordSchema), authController.resetPassword);
auth.post('/reset-password', authController.resetPassword);

export default auth