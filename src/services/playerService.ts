import {db} from '../data/db';
import {LeaderPlayer} from '../types';

const DELAY_MS = 300;

export const playerService = {
  getLeaderboard: async (): Promise<LeaderPlayer[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db.leaderboard);
      }, DELAY_MS);
    });
  },

  getPlayerById: async (id: string): Promise<LeaderPlayer | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db.leaderboard.find(p => p.id === id));
      }, DELAY_MS);
    });
  },
};
