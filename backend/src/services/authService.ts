import { userRepository } from '../repositories/userRepository'
import { RegisterUserInput } from '../schemas/auth'
import { hash } from 'bcrypt'
import { randomBytes } from "crypto"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { findByEmail, findByUsername, create } = userRepository
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

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

  login: async (identifier: string, password: string) => {
    const user = await userRepository.findByUsername(identifier);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Mot de passe incorrect");
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { token, user };
  },
}
