import { db } from '../data/db';
import { Tournament } from '../types';

// Artificial delay to simulate network latency
const DELAY_MS = 300;

export const tournamentService = {
  getTournaments: async (): Promise<Tournament[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db.tournaments);
      }, DELAY_MS);
    });
  },

  getOngoingTournaments: async (): Promise<Tournament[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db.tournaments.filter(t => t.status === 'live'));
      }, DELAY_MS);
    });
  },

  getUpcomingTournaments: async (): Promise<Tournament[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          db.tournaments.filter(
            t => t.status === 'open' || t.status === 'upcoming',
          ),
        );
      }, DELAY_MS);
    });
  },

  getTournamentById: async (id: string): Promise<Tournament | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db.tournaments.find(t => t.id === id));
      }, DELAY_MS);
    });
  },
};
