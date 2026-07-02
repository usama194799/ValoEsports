import apiClient from '../api/client';
import { LeaderPlayer } from '../types';

export const playerService = {
  getLeaderboard: async (params?: Record<string, any>): Promise<LeaderPlayer[]> => {
    try {
      if (params?.category === 'teams') {
        const response = await apiClient.get('/teams');
        const data = response.data?.data || response.data || [];
        return data.map((t: any, index: number) => ({
          id: t.id,
          rank: index + 1,
          name: t.name || 'Unknown Team',
          label: 'Team',
          avatar: t.logo_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
          points: Math.floor(Math.random() * 5000), // Fallback since no points API yet
          games: Math.floor(Math.random() * 50),
          country: t.region_id || 'US',
        }));
      } else {
        const response = await apiClient.get('/users');
        const data = response.data?.data || response.data || [];
        return data.map((u: any, index: number) => ({
          id: u.id,
          rank: index + 1,
          name: u.username || 'Player',
          label: 'Pro Player',
          avatar: u.profile?.avatar_url || 'https://images.unsplash.com/photo-1566492031523-1c4260a53123?auto=format&fit=crop&q=80',
          points: Math.floor(Math.random() * 10000), // Fallback since no XP API yet
          games: Math.floor(Math.random() * 100),
          country: u.profile?.country_id || 'US',
        }));
      }
    } catch (e) {
      console.warn('Failed to fetch leaderboard:', e);
      return [];
    }
  },

  getPlayerById: async (id: string): Promise<LeaderPlayer | undefined> => {
    try {
      const response = await apiClient.get('/users/' + id);
      const u = response.data?.data || response.data;
      if (!u) return undefined;
      return {
        id: u.id,
        rank: 1,
        name: u.username || 'Player',
        label: 'Player',
        avatar: u.profile?.avatar_url || '',
        points: 0,
        games: 0,
      };
    } catch (e) {
      console.warn('Failed to fetch player by id:', e);
      return undefined;
    }
  },
};
