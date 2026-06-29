import {useMemo} from 'react';
import {
  DUMMY_TEAMS,
  DUMMY_MEMBERS,
  DUMMY_REQUESTS,
  DUMMY_STATS,
  GAMES_LIST,
  REGIONS,
} from '../constants/dummyData';

export const useTeamData = () => {
  const getMyTeams = useMemo(() => {
    return DUMMY_TEAMS;
  }, []);

  const getTeamById = (id: string) => {
    return DUMMY_TEAMS.find(t => t.id === id);
  };

  const getTeamMembers = (teamId: string) => {
    // In reality, filter by teamId. For now, return all dummy members.
    return DUMMY_MEMBERS;
  };

  const getTeamRequests = (teamId: string) => {
    return DUMMY_REQUESTS;
  };

  const getTeamStats = (teamId: string) => {
    return DUMMY_STATS;
  };

  return {
    teams: getMyTeams,
    getTeamById,
    getTeamMembers,
    getTeamRequests,
    getTeamStats,
    gamesList: GAMES_LIST,
    regionsList: REGIONS,
  };
};
