import { useState, useEffect, useCallback } from 'react';
import { PlayerProfile } from '../types/profile';
import { DUMMY_PROFILE } from '../constants/dummyData';

export const useProfileData = () => {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setProfile(DUMMY_PROFILE);
    } catch (err) {
      setError('Failed to load profile data.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (updates: Partial<PlayerProfile>) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProfile(prev => {
        if (!prev) return prev;
        return { ...prev, ...updates };
      });
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  return {
    profile,
    isLoading,
    isRefreshing,
    error,
    refresh: () => fetchProfile(true),
    updateProfile,
  };
};
