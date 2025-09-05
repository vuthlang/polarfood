import api from "./api";

export const AuthService = {
  login: async (username: string, password: string) => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });
      return res.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.error || "Erreur de connexion au serveur"
      );
    }
  },
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

  forgotPassword: async (email: string) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.error || "Erreur lors de l'envoi de l'email"
      );
    }
  },

  resetPassword: async (token: string, password: string, confirmPassword: string) => {
    try {
      const response = await api.post(`/auth/reset-password?token=${token}`, {
        password,
        confirmPassword,
      });
      return response.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.error || "Erreur lors de la réinitialisation du mot de passe"
      );
    }
  },
};