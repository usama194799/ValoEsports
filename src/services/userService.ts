import {db} from '../data/db';
import {UserProfile, Notification, HeroBannerData} from '../types';

const DELAY_MS = 300;

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db.profile);
      }, DELAY_MS);
    });
  },

  getNotifications: async (): Promise<Notification[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db.notifications);
      }, DELAY_MS);
    });
  },

  getHeroBanner: async (): Promise<HeroBannerData> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db.hero);
      }, DELAY_MS);
    });
  },
};
