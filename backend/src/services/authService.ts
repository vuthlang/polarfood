import { userRepository } from '../repositories/userRepository'
import { RegisterUserInput } from '../schemas/user'
import { hash } from 'bcrypt'

const { findByEmail, create } = userRepository

export const authService = {
  register: async (data: RegisterUserInput) => {
    const existing = await findByEmail(data.email)
    if (existing) throw new Error('EMAIL_EXISTS')

    const passwordHash = await hash(data.password, 10)
    const [user] = await create({
      ...data,
      passwordHash,
    })

    return user
  },
}
