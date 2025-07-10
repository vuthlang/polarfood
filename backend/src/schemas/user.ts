import { z } from 'zod'

export const registerUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>
