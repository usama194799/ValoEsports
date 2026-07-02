import { useState, useEffect, useCallback } from 'react';
import { PlayerProfile } from '../types/profile';
import { userService } from '../../../services/userService';

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

      const [profileData, statsData] = await Promise.allSettled([
        userService.getProfile(),
        userService.getStatistics(),
      ]);

      const p: any = profileData.status === 'fulfilled' ? profileData.value : null;
      const s: any = statsData.status === 'fulfilled' ? statsData.value : null;

      if (!p) throw new Error('No profile data');

      setProfile({
        id: p.id,
        fullName: `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'Player',
        username: p.username || 'player',
        avatarUrl: p.avatar_url,
        coverUrl: p.banner_url,
        level: p.level || 1,
        isVerified: p.is_verified || false,
        country: p.country?.name || 'Unknown',
        countryCode: p.country?.code || 'UN',
        currentRank: p.current_rank || 'Unranked',
        highestRank: p.highest_rank || 'Unranked',
        bio: p.bio || 'No bio provided.',
        language: p.language || 'English',
        favouriteGame: p.favourite_game || 'Unknown',
        statistics: {
          matchesPlayed: s?.matches_played || 0,
          wins: s?.wins || 0,
          losses: s?.losses || 0,
          winRate: s?.win_rate ? `${s.win_rate}%` : '0%',
          kda: s?.kda || '0.0',
          headshotPercentage: s?.hs_percentage ? `${s.hs_percentage}%` : '0%',
          mvpAwards: s?.mvps || 0,
          tournamentWins: s?.tournament_wins || 0,
          prizeMoney: s?.prize_money ? `$${s.prize_money}` : '$0',
        },
        recentMatches: [],
        achievements: [],
        socialLinks: [],
      });
    } catch (err) {
      console.warn('Profile fetch error:', err);
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
      await new Promise(resolve => setTimeout(() => resolve(true), 1000));

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
