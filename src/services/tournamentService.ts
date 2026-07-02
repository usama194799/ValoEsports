import apiClient from '../api/client';
import { Tournament } from '../types';

const mapTournament = (t: any): Tournament => {
  const dateObj = t.start_date ? new Date(t.start_date) : new Date();
  return {
    ...t,
    id: t.id,
    name: t.name,
    gameName: t.game?.name || t.gameName || 'Esports',
    image: t.banner_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    location: t.region?.name || 'Online',
    mode: t.mode || '5v5',
    slots: t.max_teams || 0,
    slotsUsed: t.registered_teams || t.slotsUsed || 0,
    date: dateObj.toLocaleDateString(),
    time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: t.status,
    prizePool: t.prize_pool,
    entryFee: t.entry_fee,
  };
};

export const tournamentService = {
  getTournaments: async (params?: any): Promise<Tournament[]> => {
    try {
      const response = await apiClient.get('/tournaments', { params });
      const data = response.data?.data || response.data || [];
      return data.map(mapTournament);
    } catch (e) {
      console.warn('Failed to fetch tournaments:', e);
      return [];
    }
  },

  getOngoingTournaments: async (): Promise<Tournament[]> => {
    try {
      const response = await apiClient.get('/tournaments', { params: { status: 'ongoing' } });
      const data = response.data?.data || response.data || [];
      return data.filter((t: any) => t.status === 'ongoing').map(mapTournament);
    } catch (e) {
      console.warn('Failed to fetch ongoing tournaments:', e);
      return [];
    }
  },

  getUpcomingTournaments: async (): Promise<Tournament[]> => {
    try {
      const response = await apiClient.get('/tournaments', { params: { status: 'published' } });
      const data = response.data?.data || response.data || [];
      return data.filter((t: any) => t.status === 'published' || t.status === 'registration').map(mapTournament);
    } catch (e) {
      console.warn('Failed to fetch upcoming tournaments:', e);
      return [];
    }
  },

  getTournamentById: async (id: string): Promise<Tournament | undefined> => {
    const response = await apiClient.get('/tournaments/' + id);
    const data = response.data?.data || response.data;
    return data ? mapTournament(data) : undefined;
  },
};
