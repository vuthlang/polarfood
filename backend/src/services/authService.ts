import { userRepository } from '../repositories/userRepository'
import { RegisterUserInput } from '../schemas/user'
import { hash } from 'bcrypt'
import { randomBytes } from "crypto"

const { findByEmail, findByUsername, create } = userRepository

export const authService = {
  register: async (data: RegisterUserInput) => {
    const existingUsername = await findByUsername(data.username)
    if (existingUsername) throw new Error('USERNAME_EXISTS')

    const existingEmail = await findByEmail(data.email)
    if (existingEmail) throw new Error('EMAIL_EXISTS')

    const passwordHash = await hash(data.password, 10)

    const verificationToken = randomBytes(32).toString("hex")

    const [user] = await create({
      ...data,
      passwordHash,
      verificationToken,
      isVerified: false,
    })

    return user
  },
}
