import { db } from '../data/db';
import { Game, Match } from '../types';

const DELAY_MS = 300;

export const gameService = {
  getGames: async (): Promise<Game[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db.games);
      }, DELAY_MS);
    });
  },

  getRecentMatches: async (): Promise<Match[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          db.matches.filter(
            m => m.status === 'completed' || m.status === 'live',
          ),
        );
      }, DELAY_MS);
    });
  },

  getUpcomingMatches: async (): Promise<Match[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db.matches.filter(m => m.status === 'upcoming'));
      }, DELAY_MS);
    });
  },
};
