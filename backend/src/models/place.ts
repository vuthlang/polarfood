import { pgTable, serial, varchar, doublePrecision, timestamp, text } from "drizzle-orm/pg-core";

export const place = pgTable("place", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  postalCode: varchar("postal_code", { length: 20 }),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 255 }),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  placeType: varchar("place_type", { length: 255 }),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: false }),
  categories: text("categories").array(),
});
