import api from "./api";

export interface Visit {
  id?: number;
  userId: number;
  placeId: number;
  visitDate: Date;
  globalRating: number;
  comment?: string;
  createdAt?: Date;
}

export const VisitService = {
  create: async (visit: Omit<Visit, "id" | "createdAt">) => {
    try {
      const res = await api.post("/visit", visit);
      return res.data as Visit;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Erreur lors de la création de la visite");
    }
  },

  getAll: async (): Promise<Visit[]> => {
    try {
      const res = await api.get("/visit");
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Erreur lors de la récupération des visites");
    }
  },

  getById: async (id: number): Promise<Visit> => {
    try {
      const res = await api.get(`/visit/${id}`);
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Erreur lors de la récupération de la visite");
    }
  },

  update: async (id: number, data: Partial<Visit>): Promise<Visit> => {
    try {
      const res = await api.put(`/visit/${id}`, data);
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Erreur lors de la mise à jour de la visite");
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/visit/${id}`);
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Erreur lors de la suppression de la visite");
    }
  },

  getByUser: async (userId: number): Promise<Visit[]> => {
    try {
      const res = await api.get(`/visit/user/${userId}`);
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Erreur lors de la récupération des visites de l'utilisateur");
    }
  },


  findByUserAndPlace: async (userId: number, placeId: number): Promise<Visit | null> => {
    try {
      const res = await api.get(`/visit/user/${userId}/place/${placeId}`);
      return res.data || null;
    } catch (err: any) {
      if (err.response?.status === 404) return null;
      throw new Error(err.response?.data?.error || "Erreur lors de la récupération de la visite");
    }
  },
};
