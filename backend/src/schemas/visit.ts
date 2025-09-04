import { z } from 'zod';

export const visitSchema = z.object({
  userId: z.number(),
  placeId: z.number(),
  visitDate: z.date().optional(),
  globalRating: z.number().min(0).max(10).optional(),
  comment: z.string().optional(),
});

export type VisitInput = z.infer<typeof visitSchema>;
