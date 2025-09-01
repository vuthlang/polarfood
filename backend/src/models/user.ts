import { pgTable, serial, varchar, timestamp, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  verificationToken: varchar('verification_token', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})