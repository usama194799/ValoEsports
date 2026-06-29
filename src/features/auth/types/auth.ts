export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  hasSeenOnboarding: boolean;
}

export type AuthContextType = AuthState & {
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};
