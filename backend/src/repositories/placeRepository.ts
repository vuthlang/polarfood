import { eq, gt } from 'drizzle-orm'
import { db } from '../db/client'
import { place } from '../models/place'

export const placeRepository = {
  create: async (data: {
    name: string;
    address?: string;
    postalCode: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    placeType?: string;
    description?: string;
    categories?: string[];
  }) => {
    return db.insert(place).values({
      ...data,
      createdAt: new Date(),
    }).returning();
  },

  findById: async (id: number) => {
    return db.select().from(place).where(eq(place.id, id)).limit(1);
  },

  findAll: async () => {
    return db.select().from(place);
  },
}
