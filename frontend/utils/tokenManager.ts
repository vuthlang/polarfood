import { jwtDecode } from 'jwt-decode';
import { AuthStorage } from './authStorage';

interface TokenPayload {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}

export const getUserIdFromToken = async (): Promise<number | null> => {
  const token = await AuthStorage.getToken();
  if (!token) return null;
  const decoded = jwtDecode<TokenPayload>(token);

  return decoded.userId;
};
