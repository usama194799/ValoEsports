import { User } from '../types/auth';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DUMMY_USER: User = {
  id: 'u_12345',
  username: 'pro_gamer99',
  email: 'player@muxarena.com',
  fullName: 'Alex Chen',
  role: 'Pro Player',
  avatar:
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=150&h=150',
};

class AuthService {
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    await delay(1500); // Simulate network

    // Accept anything for mock purposes unless it's empty
    if (!email || !password) {
      throw new Error('Invalid credentials');
    }

    // Example specific fail case for demo
    if (email === 'fail@test.com') {
      throw new Error('Incorrect email or password');
    }

    return {
      token: 'mock_jwt_token_xyz',
      user: DUMMY_USER,
    };
  }

  async register(data: any): Promise<{ token: string; user: User }> {
    await delay(2000);
    return {
      token: 'mock_jwt_token_abc',
      user: {
        ...DUMMY_USER,
        username: data.username || 'new_user',
        email: data.email,
        fullName: data.fullName,
      },
    };
  }

  async requestPasswordReset(email: string): Promise<void> {
    await delay(1000);
    if (!email) throw new Error('Email required');
  }

  async verifyOTP(code: string): Promise<void> {
    await delay(1000);
    if (code !== '123456') {
      // Mock correct OTP
      throw new Error('Invalid verification code');
    }
  }

  async resetPassword(password: string): Promise<void> {
    await delay(1000);
  }
}

export const authService = new AuthService();
