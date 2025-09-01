import { z } from 'zod'

export const signupSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6), 
  verificationToken: z.string()
})

export type SignupInput = z.infer<typeof signupSchema>
