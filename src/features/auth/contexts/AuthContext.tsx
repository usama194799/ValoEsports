import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { AuthContextType, AuthState, User } from '../types/auth';
import { authService } from '../services/authService';
import { setUnauthorizedCallback } from '../../../api/client';

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
  USER: '@mux_auth_user',
  ONBOARDING: '@mux_has_seen_onboarding',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialState);

  const logout = async () => {
    try {
      await Promise.all([
        Keychain.resetGenericPassword(),
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

  useEffect(() => {
    // Setup global 401 callback
    setUnauthorizedCallback(() => {
      logout();
    });

    const checkAuthStatus = async () => {
      try {
        const onboardingStr = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING);
        const hasSeenOnboarding = onboardingStr === 'true';

        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.password) {
          try {
            const user = await authService.getCurrentUser();
            await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
            setState({
              isAuthenticated: true,
              user,
              hasSeenOnboarding,
              isLoading: false,
            });
          } catch (e) {
            // Auto logout if getCurrentUser fails (e.g. 401)
            await logout();
            setState(prev => ({ ...prev, hasSeenOnboarding, isLoading: false }));
          }
        } else {
          // No token found
          setState({
            isAuthenticated: false,
            user: null,
            hasSeenOnboarding,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Failed to load auth state', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (token: string, user: User) => {
    try {
      await Keychain.setGenericPassword('token', token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user,
      }));
    } catch (e) {
      console.error('Failed to save auth state', e);
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
