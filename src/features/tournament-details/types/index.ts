export interface PrizeReward {
  id: string;
  position: number | string; // e.g. 1, 2, 'MVP'
  amount: string; // e.g. "$5,000"
  label: string; // e.g. "First Place", "MVP Reward"
  icon?: string;
}

export interface TournamentRule {
  id: string;
  title: string;
  content: string;
}

export interface ParticipatingTeam {
  id: string;
  name: string;
  logo: string;
  captain: string;
  country: string;
  rank: number;
  wins: number;
  losses: number;
}

export interface TournamentMatch {
  id: string;
  date: string;
  time: string;
  teamA: {
    name: string;
    logo: string;
  };
  teamB: {
    name: string;
    logo: string;
  };
  status: 'upcoming' | 'live' | 'completed';
  scoreA?: number;
  scoreB?: number;
}

export interface OrganizerProfile {
  id: string;
  name: string;
  logo: string;
  isVerified: boolean;
  followers: number;
  completedTournaments: number;
  rating: number; // e.g. 4.8
}

export interface TournamentStats {
  totalTeams: number;
  registeredPlayers: number;
  completedMatches: number;
  remainingMatches: number;
  spectators: number;
  views: number;
  likes: number;
}

export interface DetailedTournament {
  id: string;
  name: string;
  gameName: string;
  banner: string;
  status: 'live' | 'open' | 'closed' | 'upcoming';
  type: string; // e.g. "Pro League"
  teamSize: string; // "5v5", "Squad"
  format: string; // "Double Elimination", "Swiss"
  entryFee: string; // "Free", "$10"
  prizePool: string; // "$10,000"
  registrationDeadline: string;
  startDate: string;
  startTime: string;
  serverRegion: string;
  platform: string; // "Mobile", "PC"
  slots: number;
  slotsUsed: number;
  description: string;
  isFavorite: boolean;
  
  organizer: OrganizerProfile;
  stats: TournamentStats;
  prizes: PrizeReward[];
  rules: TournamentRule[];
  teams: ParticipatingTeam[];
  schedule: TournamentMatch[];
}
