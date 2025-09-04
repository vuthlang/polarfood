import { visitRepository } from '../repositories/visitRepository';
import { Visit } from '../models/visit';

export const visitService = {
  create: async (data: Visit) => {
    const existingVisit = await visitRepository.findByUserAndPlace(
      data.userId,
      data.placeId
    );

    if (existingVisit) {
      return visitRepository.update(existingVisit.id, {
        globalRating: data.globalRating,
        comment: data.comment,
        visitDate: data.visitDate,
        createdAt: new Date(),
      });
    }

    return visitRepository.create({
      ...data,
      createdAt: new Date(), 
    });
  },


  getById: async (id: number) => {
    return visitRepository.findById(id);
  },

  getAll: async () => {
    return visitRepository.findAll();
  },

  getByUserId: async (userId: number) => {
    return visitRepository.findByUserId(userId);
  },

  update: async (id: number, data: Partial<Visit>) => {
    return visitRepository.update(id, data);
  },

  delete: async (id: number) => {
    return visitRepository.delete(id);
  },
};
