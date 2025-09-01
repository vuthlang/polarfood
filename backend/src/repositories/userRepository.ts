import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { users } from '../models/user'

export const userRepository = {
  findByEmail: async (email: string) => {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    })
  },

  findByUsername: async (username: string) => {
    return db.query.users.findFirst({
      where: eq(users.username, username),
    })
  },

  create: async (data: {
    username: string
    email: string
    passwordHash: string
    verificationToken: string
    isVerified: boolean
  }) => {
    return db.insert(users).values(data).returning()
  },

  findByToken: async (token: string) => {
    return db.query.users.findFirst({
      where: eq(users.verificationToken, token),
    })
  },

  verifyUser: async (id: number) => {
    return db.update(users)
      .set({ isVerified: true, verificationToken: null })
      .where(eq(users.id, id))
  },
}
