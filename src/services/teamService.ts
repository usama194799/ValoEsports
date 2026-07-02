import apiClient from '../api/client';
import { Team } from '../features/team/types/team';

export const teamService = {
  getTeams: async (params?: any): Promise<Team[]> => {
    const response = await apiClient.get('/teams', { params });
    return response.data?.data || response.data || [];
  },

  getTeamById: async (id: string): Promise<Team | undefined> => {
    const response = await apiClient.get(`/teams/${id}`);
    return response.data?.data || response.data;
  },

  createTeam: async (data: any): Promise<Team> => {
    const response = await apiClient.post('/teams', data);
    return response.data?.data || response.data;
  },

  updateTeam: async (id: string, data: any): Promise<Team> => {
    const response = await apiClient.put(`/teams/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteTeam: async (id: string): Promise<void> => {
    await apiClient.delete(`/teams/${id}`);
  },

  transferCaptain: async (teamId: string, newCaptainId: string): Promise<void> => {
    await apiClient.post(`/teams/${teamId}/transfer-captain`, { new_captain_id: newCaptainId });
  },

  removeMember: async (teamId: string, memberId: string): Promise<void> => {
    await apiClient.delete(`/teams/${teamId}/members/${memberId}`);
  },

  inviteMember: async (teamId: string, userId: string): Promise<void> => {
    await apiClient.post(`/teams/${teamId}/invite`, { user_id: userId });
  },

  acceptInvite: async (inviteId: string): Promise<void> => {
    await apiClient.post(`/team-invitations/${inviteId}/accept`);
  },

  rejectInvite: async (inviteId: string): Promise<void> => {
    await apiClient.post(`/team-invitations/${inviteId}/reject`);
  },

  requestJoin: async (teamId: string): Promise<void> => {
    await apiClient.post(`/teams/${teamId}/join`);
  },

  approveRequest: async (requestId: string): Promise<void> => {
    await apiClient.post(`/team-requests/${requestId}/approve`);
  },

  rejectRequest: async (requestId: string): Promise<void> => {
    await apiClient.post(`/team-requests/${requestId}/reject`);
  },
};
