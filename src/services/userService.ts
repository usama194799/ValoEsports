import apiClient from '../api/client';
import { UserProfile, HeroBannerData } from '../types';

export const userService = {
  getProfile: async (): Promise<UserProfile | null> => {
    try {
      const response = await apiClient.get('/profile');
      return response.data?.data || response.data;
    } catch (e) {
      console.warn('Failed to fetch profile:', e);
      return null;
    }
  },

  getHeroBanner: async (): Promise<HeroBannerData> => {
    try {
      const response = await apiClient.get('/content/hero');
      return response.data?.data || response.data;
    } catch (error) {
      console.warn("Failed to fetch /content/hero, falling back to featured tournament logic");
      // If no banner tournament, grab the first featured tournament
      const fallback = await apiClient.get('/tournaments', { params: { is_featured: 1 } });
      const fallbackData = fallback.data?.data || fallback.data || [];
      
      if (fallbackData.length > 0) {
        const t = fallbackData[0];
        return {
          id: t.id,
          gameName: t.gameName,
          tournamentName: t.name,
          date: t.date,
          time: t.time,
          image: t.image,
        };
      }
      console.warn('Hero banner not found and no featured tournaments available.');
      return null as any;
    }
  },

  getStatistics: async (): Promise<any> => {
    try {
      const response = await apiClient.get('/profile/statistics');
      return response.data?.data || response.data || null;
    } catch (e) {
      console.warn('Failed to fetch statistics', e);
      return null;
    }
  },

  getAnnouncements: async (): Promise<any[]> => {
    try {
      const response = await apiClient.get('/announcements');
      return response.data?.data || response.data || [];
    } catch (e) {
      console.warn('Failed to fetch announcements', e);
      return [];
    }
  },
};
