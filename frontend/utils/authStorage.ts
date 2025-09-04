import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthStorage = {
  saveToken: async (token: string) => {
    await AsyncStorage.setItem("auth_token", token);
  },

  getToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem("auth_token");
  },

  clearToken: async () => {
    await AsyncStorage.removeItem("auth_token");
  },
};
