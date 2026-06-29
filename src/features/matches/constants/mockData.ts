export const MOCK_TEAMS = {
  team1: {
    id: 'team_1',
    name: 'Cloud9',
    tag: 'C9',
    logoUrl:
      'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop',
  },
  team2: {
    id: 'team_2',
    name: 'Sentinels',
    tag: 'SEN',
    logoUrl:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop',
  },
  team3: {
    id: 'team_3',
    name: '100 Thieves',
    tag: '100T',
    logoUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop',
  },
  team4: {
    id: 'team_4',
    name: 'NRG Esports',
    tag: 'NRG',
    logoUrl:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop',
  },
};

export const MOCK_MATCHES = [
  {
    id: 'match_1',
    tournamentName: 'VCT 2026 Masters',
    tournamentBanner:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    matchNumber: 'M12',
    round: 'Semi-Finals',
    bestOf: 'BO3',
    teamA: MOCK_TEAMS.team1,
    teamB: MOCK_TEAMS.team2,
    matchTime: 'Today, 18:00 UTC',
    countdown: '02:15:00',
    status: 'upcoming', // upcoming, live, completed
    scoreA: 0,
    scoreB: 0,
  },
  {
    id: 'match_2',
    tournamentName: 'VCT 2026 Masters',
    tournamentBanner:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80',
    matchNumber: 'M13',
    round: 'Semi-Finals',
    bestOf: 'BO3',
    teamA: MOCK_TEAMS.team3,
    teamB: MOCK_TEAMS.team4,
    matchTime: 'Live Now',
    countdown: '',
    status: 'live',
    scoreA: 1,
    scoreB: 0,
  },
  {
    id: 'match_3',
    tournamentName: 'VCT 2026 Challengers',
    tournamentBanner:
      'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80',
    matchNumber: 'M08',
    round: 'Quarter-Finals',
    bestOf: 'BO1',
    teamA: MOCK_TEAMS.team1,
    teamB: MOCK_TEAMS.team4,
    matchTime: 'Yesterday, 14:00 UTC',
    countdown: '',
    status: 'completed',
    scoreA: 1,
    scoreB: 0,
    winnerId: 'team_1',
  },
];

export const MOCK_BRACKET = [
  {
    id: 'sf_1',
    round: 'Semi-Final',
    matchId: 'match_1',
    teamA: MOCK_TEAMS.team1,
    teamB: MOCK_TEAMS.team2,
    scoreA: 0,
    scoreB: 0,
    status: 'upcoming',
    nextMatchId: 'final_1',
  },
  {
    id: 'sf_2',
    round: 'Semi-Final',
    matchId: 'match_2',
    teamA: MOCK_TEAMS.team3,
    teamB: MOCK_TEAMS.team4,
    scoreA: 1,
    scoreB: 0,
    status: 'live',
    nextMatchId: 'final_1',
  },
  {
    id: 'final_1',
    round: 'Grand Final',
    matchId: 'match_final',
    teamA: null, // TBD
    teamB: null, // TBD
    scoreA: 0,
    scoreB: 0,
    status: 'upcoming',
    nextMatchId: null,
  },
];

export const MOCK_MATCH_DETAILS = {
  id: 'match_2',
  tournament: 'VCT 2026 Masters',
  round: 'Semi-Finals',
  bestOf: 'BO3',
  mapPool: ['Ascent', 'Bind', 'Lotus'],
  serverRegion: 'NA Central',
  referee: 'Admin_Sarah',
  rules: 'Standard VCT Competitive Ruleset',
  captainA: 'TenZ',
  captainB: 'Asuna',
};

export const MOCK_LIVE_STATS = {
  mapName: 'Ascent',
  elapsedTime: '34:12',
  spectatorCount: 12450,
  playersA: [
    {
      id: 'p1',
      name: 'TenZ',
      kills: 24,
      deaths: 12,
      assists: 5,
      mvp: true,
      role: 'Duelist',
      avatar:
        'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop',
    },
    {
      id: 'p2',
      name: 'Zellsis',
      kills: 15,
      deaths: 14,
      assists: 8,
      mvp: false,
      role: 'Flex',
      avatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    },
  ],
  playersB: [
    {
      id: 'p3',
      name: 'Asuna',
      kills: 18,
      deaths: 15,
      assists: 6,
      mvp: false,
      role: 'Duelist',
      avatar:
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    },
    {
      id: 'p4',
      name: 'Cryocells',
      kills: 20,
      deaths: 14,
      assists: 2,
      mvp: false,
      role: 'Chamber',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
  ],
};

export const MOCK_RESULT = {
  winner: MOCK_TEAMS.team1,
  finalScore: '2 - 1',
  mvp: {
    name: 'TenZ',
    kills: 64,
    avatar:
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop',
  },
  prizeEarned: '$15,000',
  xpEarned: '+1500 XP',
};

export const MOCK_HISTORY = MOCK_MATCHES;
