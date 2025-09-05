import { eq, gt, and } from 'drizzle-orm'
import { db } from '../db/client'
import { user } from '../db/schema/user'
import { User } from '../models/user'

export const userRepository = {
  findByEmail: async (email: string) => {
    return db.query.user.findFirst({
      where: eq(user.email, email),
    })
  },

  findByUsername: async (username: string) => {
    return db.query.user.findFirst({
      where: eq(user.username, username),
    })
  },

  create: async (data: User) => {
    return db.insert(user).values(data).returning();
  },

  findByToken: async (token: string) => {
    return db.query.user.findFirst({
      where: eq(user.verificationToken, token),
    })
  },

  verifyUser: async (id: number) => {
    return db.update(user)
      .set({ isVerified: true, verificationToken: null })
      .where(eq(user.id, id))
  },

  saveResetToken: async (id: number, token: string, expiresAt: Date) => {
    return db.update(user)
      .set({ resetPasswordToken: token, resetPasswordTokenExpires: expiresAt })
      .where(eq(user.id, id))
  },

  findByResetToken: async (token: string) => {
    return db.query.user.findFirst({
      where: (u) =>
        and(
          eq(u.resetPasswordToken, token),
          gt(u.resetPasswordTokenExpires, new Date())
        ),
    });
  },

  updatePassword: async (id: number, passwordHash: string) => {
    return db.update(user)
      .set({ passwordHash })
      .where(eq(user.id, id))
  },

  clearResetToken: async (id: number) => {
    return db.update(user)
      .set({ resetPasswordToken: null, resetPasswordTokenExpires: null })
      .where(eq(user.id, id))
  },
}
