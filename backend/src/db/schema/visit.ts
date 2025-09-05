import { pgTable, serial, integer, date, text, timestamp } from "drizzle-orm/pg-core";

export const visit = pgTable("visit", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  placeId: integer("place_id"),
  visitDate: date("visit_date"),
  globalRating: integer("global_rating"),
  comment: text("comment"),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
