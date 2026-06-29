import { Team } from '../../team/types/team';

export const REGISTRATION_TOURNAMENT_DETAILS = {
  id: 'tourney-reg-1',
  name: 'VALORANT Champions Tour 2026',
  game: 'VALORANT',
  mode: '5v5 Competitive',
  entryFee: '$50 per team',
  prizePool: '$100,000 USD',
  bannerUrl:
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
  startDate: 'July 15, 2026',
  endDate: 'July 30, 2026',
  registrationDeadline: 'July 10, 2026 23:59 UTC',
  slotsRemaining: 12,
  totalSlots: 64,
  rulesSummary: [
    'All players must be 16 years or older.',
    'Teams must have exactly 5 active players and up to 2 reserves.',
    'All players must have a minimum rank of Ascendant 1.',
    'Matches will be played on NA servers.',
    'Use of third-party software is strictly prohibited.',
  ],
  requirements: [
    { id: 'req_1', label: 'Minimum 5 Members', type: 'member_count' },
    { id: 'req_2', label: 'All players must be Ascendant 1+', type: 'rank' },
    { id: 'req_3', label: 'No banned accounts', type: 'account_status' },
  ],
  termsAndConditions: `
# Terms and Conditions

By registering for this tournament, you agree to the following terms:
1. You commit to playing all scheduled matches.
2. You agree to follow the code of conduct.
3. You consent to your gameplay being broadcasted.
4. Entry fees are non-refundable.
  `,
  fullRules: `
# Full Tournament Rules

## 1. Match Rules
- Best of 3 format for playoffs.
- Map pool: Ascent, Bind, Breeze, Icebox, Lotus, Split, Sunset.

## 2. Roster Rules
- Roster locks take place 24 hours before the first match.
- Substitutions are only allowed between maps.

## 3. Disconnects
- If a player disconnects, the game must be paused immediately.
- Teams have a total of 10 minutes of pause time per map.
  `,
};

export const MOCK_ELIGIBLE_TEAMS: Team[] = [
  {
    id: 'team_1',
    name: 'Cloud9',
    shortTag: 'C9',
    logoUrl:
      'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop',
    bannerUrl:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    game: 'VALORANT',
    captainId: 'user_1',
    country: 'USA',
    region: 'NA',
    rank: 1,
    level: 50,
    wins: 120,
    losses: 45,
    membersCount: 5,
    maxMembers: 7,
    description: 'Professional esports team',
    privacy: 'private',
    approvalRequired: true,
  },
  {
    id: 'team_2',
    name: 'Sentinels',
    shortTag: 'SEN',
    logoUrl:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop',
    bannerUrl:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    game: 'VALORANT',
    captainId: 'user_2',
    country: 'USA',
    region: 'NA',
    rank: 2,
    level: 48,
    wins: 110,
    losses: 50,
    membersCount: 6,
    maxMembers: 7,
    description: 'The kings of NA',
    privacy: 'public',
    approvalRequired: false,
  },
];

export const MOCK_INELIGIBLE_TEAMS: Team[] = [
  {
    id: 'team_3',
    name: 'Rookies',
    shortTag: 'ROOK',
    logoUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop',
    bannerUrl:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    game: 'VALORANT',
    captainId: 'user_3',
    country: 'USA',
    region: 'NA',
    rank: 150,
    level: 10,
    wins: 12,
    losses: 20,
    membersCount: 3,
    maxMembers: 7,
    description: 'Just starting out',
    privacy: 'public',
    approvalRequired: false,
  },
];
