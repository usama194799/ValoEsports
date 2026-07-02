import apiClient from '../api/client';
import { Match } from '../types';

export const matchService = {
  getRecentMatches: async (): Promise<Match[]> => {
    try {
      const response = await apiClient.get('/matches', { params: { status: 'completed', limit: 5 } });
      return response.data?.data || response.data || [];
    } catch (e) {
      console.warn('Failed to fetch recent matches', e);
      return [];
    }
  },

  getMatches: async (params?: any): Promise<Match[]> => {
    try {
      const response = await apiClient.get('/matches', { params });
      return response.data?.data || response.data || [];
    } catch (e) {
      console.warn('Failed to fetch matches', e);
      return [];
    }
  },

  getMatchById: async (id: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/matches/${id}`);
      return response.data?.data || response.data;
    } catch (e) {
      console.warn('Failed to fetch match by id', e);
      return null;
    }
  },

  getTournamentBrackets: async (tournamentId: string): Promise<any[]> => {
    try {
      const response = await apiClient.get(`/brackets/${tournamentId}`);
      return response.data?.data || response.data || [];
    } catch (e) {
      console.warn('Failed to fetch tournament brackets', e);
      return [];
    }
  },
};
