import {Team, TeamMember, TeamRequest, TeamStats} from '../types/team';

export const DUMMY_TEAMS: Team[] = [
  {
    id: 't1',
    name: 'Cloud9 Esports',
    shortTag: 'C9',
    logoUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=150&h=150',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&h=200',
    game: 'Valorant',
    captainId: 'u1',
    country: 'United States',
    region: 'NA',
    rank: 1,
    level: 50,
    wins: 142,
    losses: 35,
    membersCount: 5,
    activeTournament: 'VCT Masters 2026',
    description: 'Professional esports organization fielding top-tier teams across multiple titles. We aim for excellence and dominance in every match.',
    privacy: 'public',
    maxMembers: 10,
  },
  {
    id: 't2',
    name: 'Team Liquid',
    shortTag: 'TL',
    logoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=150&h=150',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600&h=200',
    game: 'CS2',
    captainId: 'u2',
    country: 'Netherlands',
    region: 'EU',
    rank: 4,
    level: 45,
    wins: 98,
    losses: 41,
    membersCount: 7,
    description: 'European powerhouse competing at the highest level of Counter-Strike.',
    privacy: 'private',
    approvalRequired: true,
    maxMembers: 15,
  },
];

export const DUMMY_MEMBERS: TeamMember[] = [
  {
    id: 'u1',
    name: 'TenZ',
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=100&h=100',
    role: 'captain',
    level: 99,
    online: true,
  },
  {
    id: 'u3',
    name: 'Kyedae',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100',
    role: 'co-leader',
    level: 85,
    online: false,
  },
  {
    id: 'u4',
    name: 'ShahZaM',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100',
    role: 'player',
    level: 92,
    online: true,
  },
  {
    id: 'u5',
    name: 'dapr',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100&h=100',
    role: 'player',
    level: 90,
    online: true,
  },
  {
    id: 'u6',
    name: 'zombs',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
    role: 'reserve',
    level: 88,
    online: false,
  }
];

export const DUMMY_REQUESTS: TeamRequest[] = [
  {
    id: 'req1',
    fromTeamId: 't1',
    toTeamId: 't2',
    status: 'pending',
  }
];

export const DUMMY_STATS: TeamStats = {
  totalMatches: 177,
  winRate: 80.2,
  averageScore: 13.4,
};

export const GAMES_LIST = [
  'Valorant',
  'CS2',
  'PUBG Mobile',
  'BGMI',
  'Free Fire',
  'Call of Duty',
  'Apex Legends',
];

export const REGIONS = [
  'NA',
  'EU',
  'SEA',
  'SA',
  'MENA',
];
