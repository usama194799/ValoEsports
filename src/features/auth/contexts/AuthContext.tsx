import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, AuthState, User } from '../types/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  hasSeenOnboarding: false,
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  logout: async () => {},
  completeOnboarding: async () => {},
});

const STORAGE_KEYS = {
  TOKEN: '@mux_auth_token',
  USER: '@mux_auth_user',
  ONBOARDING: '@mux_has_seen_onboarding',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Check initial state from AsyncStorage
    const checkAuthStatus = async () => {
      try {
        const [token, userStr, onboardingStr] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING),
        ]);

        const hasSeenOnboarding = onboardingStr === 'true';
        let user = null;
        if (userStr) {
          try {
            user = JSON.parse(userStr);
          } catch (e) {}
        }

        setState({
          isAuthenticated: !!token && !!user,
          user: user,
          hasSeenOnboarding,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to load auth state', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (token: string, user: User) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
      ]);
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user,
      }));
    } catch (e) {
      console.error('Failed to save auth state', e);
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
      ]);
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
      }));
    } catch (e) {
      console.error('Failed to clear auth state', e);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING, 'true');
      setState(prev => ({ ...prev, hasSeenOnboarding: true }));
    } catch (e) {
      console.error('Failed to save onboarding state', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, completeOnboarding }}
    >
      {children}
    </AuthContext.Provider>
  );
};
