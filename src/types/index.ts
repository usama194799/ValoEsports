// Tournament Types
export interface Tournament {
  id: string;
  name: string;
  gameName: string;
  image: string;
  location: string;
  mode: string;
  slots: number;
  slotsUsed: number;
  date: string;
  time: string;
  status: 'live' | 'open' | 'upcoming' | 'completed';
  organizer?: string;
  entryFee?: string; // e.g. "Free" or "100"
  prizePool?: string; // e.g. "10k" or "None"
  registrationDeadline?: string;
  isFavorite?: boolean;
}

// Leaderboard Types
export interface LeaderPlayer {
  id: string;
  rank: number;
  teamName: string;
  teamLabel: string;
  avatar: string;
  points: number;
  games: number;
}

// Hero Banner Type
export interface HeroBannerData {
  id: string;
  gameName: string;
  tournamentName: string;
  date: string;
  time: string;
  image: string;
}

// Navigation Tab Type
export type TabName =
  | 'Home'
  | 'Tournaments'
  | 'Center'
  | 'Notification'
  | 'Profile';

export interface NavTab {
  name: TabName;
  icon: string;
  label: string;
}

// Badge Chip Type
export type BadgeVariant = 'location' | 'mode' | 'slots' | 'live' | 'open';

export interface BadgeChipProps {
  variant: BadgeVariant;
  label: string;
  icon?: string;
}

// User Profile
export interface UserProfile {
  id: string;
  username: string;
  role: string;
  avatar: string;
  totalPoints: number;
  matchesPlayed: number;
  tournamentsWon: number;
}

// Games
export interface Game {
  id: string;
  name: string;
  coverImage: string;
  activePlayers: number;
  totalTournaments: number;
}

// Matches
export interface Match {
  id: string;
  gameId: string;
  tournamentId: string;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  status: 'upcoming' | 'live' | 'completed';
  date: string;
  time: string;
}

// Notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'tournament' | 'match' | 'system' | 'social';
}
