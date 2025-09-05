import { placeRepository } from "../repositories/placeRepository";

export const placeService = {
  createPlace: async (data: {
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
    if (!data.name) {
      throw new Error("Le nom du lieu est obligatoire");
    }

    return placeRepository.create(data);
  },

  getPlaceById: async (id: number) => {
    const place = await placeRepository.findById(id);
    if (!place || place.length === 0) {
      throw new Error("Lieu introuvable");
    }
    return place[0];
  },

  getAllPlaces: async () => {
    return placeRepository.findAll();
  },
};
