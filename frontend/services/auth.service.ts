import api from "./api";

export const AuthService = {
  register: async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post("/auth/register", data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data.error || "Email already in use");
      }
      throw error;
    }
  },
};