import apiClient from '../api/client';

export interface Registration {
  id: string;
  tournamentId: string;
  teamId: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  createdAt: string;
}

export const registrationService = {
  getTournamentRegistrations: async (tournamentId: string): Promise<Registration[]> => {
    const response = await apiClient.get(`/tournaments/${tournamentId}/registrations`);
    return response.data?.data || response.data || [];
  },

  registerForTournament: async (tournamentId: string, teamId: string): Promise<Registration> => {
    const response = await apiClient.post(`/tournaments/${tournamentId}/register`, {
      team_id: teamId,
    });
    return response.data?.data || response.data;
  },

  cancelRegistration: async (registrationId: string): Promise<void> => {
    await apiClient.post(`/registrations/${registrationId}/cancel`);
  },
};
