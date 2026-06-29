export interface Statistic {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export interface MatchHistory {
  id: string;
  game: string;
  tournament: string;
  result: 'Win' | 'Loss';
  date: string;
  kills: number;
  deaths: number;
  assists: number;
  isMVP: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  progress: number;
  total: number;
}

export interface SocialLink {
  id: string;
  platform: 'discord' | 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'twitch';
  url: string;
  username: string;
}

export interface PlayerProfile {
  id: string;
  fullName: string;
  username: string;
  avatarUrl?: string;
  coverUrl?: string;
  level: number;
  isVerified: boolean;
  country: string;
  countryCode: string; // e.g. "US"
  currentRank: string;
  highestRank: string;
  bio: string;
  language: string;
  favouriteGame: string;
  
  statistics: {
    matchesPlayed: number;
    wins: number;
    losses: number;
    winRate: string;
    kda: string;
    headshotPercentage: string;
    mvpAwards: number;
    tournamentWins: number;
    prizeMoney: string;
  };

  recentMatches: MatchHistory[];
  achievements: Achievement[];
  socialLinks: SocialLink[];
}
