import { z } from 'zod'

export const registerSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  verificationToken: z.string()
})

export const registerUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>

export type RegisterInput = z.infer<typeof registerSchema>
