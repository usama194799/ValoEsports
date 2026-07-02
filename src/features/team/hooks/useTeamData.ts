import { useMemo } from 'react';
import { teamService } from '../../../services/teamService';
import { gameService } from '../../../services/gameService';

export const useTeamData = () => {
  return {
    getMyTeams: async () => {
      // Backend might have a specific endpoint for authenticated user's teams,
      // but assuming standard GET /teams endpoint with user filtering.
      return teamService.getTeams();
    },
    getTeamById: async (id: string) => {
      return teamService.getTeamById(id);
    },
    // The following rely on getTeamById to map nested fields,
    // since the Laravel backend aggregates them in the single API call.
    getTeamMembers: async (teamId: string) => {
      const team = await teamService.getTeamById(teamId);
      return (team as any)?.members || [];
    },
    getTeamRequests: async (teamId: string) => {
      const team = await teamService.getTeamById(teamId);
      return (team as any)?.requests || [];
    },
    getTeamStats: async (teamId: string) => {
      const team = await teamService.getTeamById(teamId);
      return (team as any)?.stats || {
        tournamentsPlayed: 0,
        winRate: 0,
        tournamentsWon: 0,
        totalEarnings: 0,
        matchesPlayed: 0,
      };
    },
    gamesList: async () => {
      return gameService.getGames();
    },
    regionsList: [
      { id: 'global', name: 'Global' },
      { id: 'asia', name: 'Asia' },
      { id: 'na', name: 'North America' },
      { id: 'eu', name: 'Europe' },
      { id: 'mena', name: 'Middle East' },
    ],
  };
};
