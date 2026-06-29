export interface Team {
  id: string;
  name: string;
  shortTag: string;
  logoUrl: string;
  bannerUrl: string;
  game: string;
  captainId: string;
  country: string;
  region: string;
  rank: number;
  level: number;
  wins: number;
  losses: number;
  membersCount: number;
  activeTournament?: string;
  description: string;
  privacy: 'public' | 'private';
  approvalRequired?: boolean;
  maxMembers: number;
}

export interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
  role: 'captain' | 'co-leader' | 'player' | 'reserve';
  level: number;
  online: boolean;
}

export interface TeamRequest {
  id: string;
  fromTeamId: string;
  toTeamId: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface TeamStats {
  totalMatches: number;
  winRate: number;
  averageScore: number;
}
