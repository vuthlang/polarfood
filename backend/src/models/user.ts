export interface User {
  id?: number;
  username: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordTokenExpires?: Date | null;
  createdAt?: Date;
}
