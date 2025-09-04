import api from "./api";

export interface Place {
  id?: number;
  name: string;
  address: string;
  postalCode?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  placeType?: string;
  description?: string;
  createdAt?: string;
  categories?: string[];
}

export const PlaceService = {
  create: async (place: Place) => {
    try {
      const res = await api.post("/place", place);
      return res.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.error || "Erreur lors de la création du lieu"
      );
    }
  },

  getPlaces: async (): Promise<Place[]> => {
    try {
      const res = await api.get("/place");
      return res.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.error || "Erreur lors de la récupération des lieux"
      );
    }
  }
}