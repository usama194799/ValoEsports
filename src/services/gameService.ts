import apiClient from '../api/client';
import { Game } from '../types';

const DELAY_MS = 300;

export const gameService = {
  getGames: async (): Promise<Game[]> => {
    const response = await apiClient.get('/games');
    return response.data?.data || response.data || [];
  },

  getGameById: async (id: string): Promise<Game | undefined> => {
    const response = await apiClient.get('/games/' + id);
    return response.data?.data || response.data;
  },
};
