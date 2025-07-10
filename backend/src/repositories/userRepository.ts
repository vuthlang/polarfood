import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { users } from '../models/user'

export const userRepository = {
  findByEmail: async (email: string) => {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    })
  },

  create: async (data: {
    username: string
    email: string
    passwordHash: string
  }) => {
    return db.insert(users).values(data).returning()
  },
}
