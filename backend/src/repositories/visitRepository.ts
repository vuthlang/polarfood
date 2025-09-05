import { and, eq } from 'drizzle-orm';
import { db } from '../db/client';
import { visit } from '../db/schema/visit';
import { Visit } from '../models/visit';

export const visitRepository = {
  create: async (data: Visit) => {
    const visitDateString = data.visitDate
      ? data.visitDate.toISOString().split('T')[0]
      : undefined;

    return db.insert(visit)
      .values({
        ...data,
        visitDate: visitDateString,
        createdAt: new Date()
      })
      .returning();
  },

  findById: async (id: number) => {
    return db.query.visit.findFirst({
      where: eq(visit.id, id),
    });
  },

  findByUserId: async (userId: number) => {
    return db.query.visit.findMany({
      where: eq(visit.userId, userId),
    });
  },

  findAll: async () => {
    return db.query.visit.findMany();
  },

  findByUserAndPlace: async (userId: number, placeId: number) => {
    return db.query.visit.findFirst({
      where: and(eq(visit.userId, userId), eq(visit.placeId, placeId)),
    });
  },

  update: async (id: number, data: Partial<Visit>) => {
    const { visitDate, ...rest } = data;

    const visitDateString = visitDate
      ? visitDate.toISOString().split('T')[0]
      : undefined;

    return db.update(visit)
      .set({
        ...rest,
        ...(visitDateString && { visitDate: visitDateString })
      })
      .where(eq(visit.id, id))
      .returning();
  },

  delete: async (id: number) => {
    return db.delete(visit).where(eq(visit.id, id));
  },
};
