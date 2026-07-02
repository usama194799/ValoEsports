import apiClient from '../../../api/client';
import { User } from '../types/auth';

class AuthService {
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  }

  async register(data: any): Promise<{ token: string; user: User }> {
    const response = await apiClient.post('/register', data);
    return response.data;
  }

  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post('/forgot-password', { email });
  }

  async verifyOTP(code: string): Promise<void> {
    // Assuming backend endpoint for OTP verification if required
    await apiClient.post('/verify-otp', { code });
  }

  async resetPassword(password: string): Promise<void> {
    await apiClient.post('/reset-password', { password });
  }

  async logout(): Promise<void> {
    await apiClient.post('/logout');
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/user');
    return response.data;
  }
}

export const authService = new AuthService();
