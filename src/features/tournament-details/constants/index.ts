import {DetailedTournament} from '../types';
import {Images} from '../../../theme/images';

export const MOCK_TOURNAMENT_DETAILS: DetailedTournament = {
  id: 't-details-1',
  name: 'Call of Duty Mobile Summer Championship',
  gameName: 'COD MOBILE',
  banner: Images.hero.bg1,
  status: 'open',
  type: 'Pro League',
  teamSize: '5v5',
  format: 'Double Elimination',
  entryFee: 'Free',
  prizePool: '10k USD',
  registrationDeadline: '09 Aug 2026, 23:59',
  startDate: '10 Aug 2026',
  startTime: '22:00',
  serverRegion: 'Middle East / Asia',
  platform: 'Mobile Only',
  slots: 128,
  slotsUsed: 112,
  isFavorite: false,
  description: `Welcome to the biggest Call of Duty Mobile Summer Championship of the year! Gather your squad and prepare for intense 5v5 action across iconic maps.\n\nThis tournament is open to all skill levels but designed for the most competitive players. Prove your dominance, climb the bracket, and secure your share of the massive $10,000 prize pool.\n\nAll matches will be streamed live on our official channels. Make sure your team is fully registered before the deadline. Good luck, soldiers!`,
  
  organizer: {
    id: 'org-1',
    name: 'Mux eSports',
    logo: Images.avatars.player1,
    isVerified: true,
    followers: 45200,
    completedTournaments: 124,
    rating: 4.9,
  },
  
  stats: {
    totalTeams: 128,
    registeredPlayers: 560,
    completedMatches: 0,
    remainingMatches: 127,
    spectators: 12500,
    views: 450000,
    likes: 8400,
  },
  
  prizes: [
    {id: 'pz1', position: 1, amount: '$5,000', label: 'First Place', icon: 'trophy'},
    {id: 'pz2', position: 2, amount: '$2,500', label: 'Second Place', icon: 'medal'},
    {id: 'pz3', position: 3, amount: '$1,000', label: 'Third Place', icon: 'medal'},
    {id: 'pz4', position: 4, amount: '$500', label: 'Fourth Place', icon: 'star'},
    {id: 'pz5', position: 'MVP', amount: '$1,000', label: 'Tournament MVP', icon: 'crown'},
  ],
  
  rules: [
    {
      id: 'r1',
      title: 'Tournament Format & Rules',
      content: 'All matches are Double Elimination. Winners bracket matches are Best of 3 (BO3). Losers bracket matches are Best of 1 (BO1) until the finals. Grand finals will be Best of 5 (BO5) with a 1-map advantage for the upper bracket winner.',
    },
    {
      id: 'r2',
      title: 'Player Eligibility',
      content: 'Players must be at least 16 years of age. All players must use a registered account in good standing. Emulators are strictly prohibited and will result in an immediate team ban.',
    },
    {
      id: 'r3',
      title: 'Check-in Rules',
      content: 'Captains must check-in their team 30 minutes prior to the tournament start time. Failure to check-in will result in disqualification and the slot will be given to a waitlisted team.',
    },
    {
      id: 'r4',
      title: 'Disconnection Policy',
      content: 'If a player disconnects before the first kill, the match will be restarted. If a disconnection happens after the first kill, the match continues. Teams have a maximum of 5 minutes pause time per map.',
    },
    {
      id: 'r5',
      title: 'Code of Conduct',
      content: 'Toxic behavior, racism, sexism, or any form of harassment will not be tolerated. Severe violations will result in prize forfeiture and a permanent ban from future Mux eSports events.',
    },
  ],
  
  teams: [
    {id: 'tm1', name: 'Team Liquid', logo: Images.avatars.player2, captain: 'iFerg', country: 'USA', rank: 1, wins: 45, losses: 12},
    {id: 'tm2', name: 'Fnatic', logo: Images.avatars.player3, captain: 'Joker', country: 'UK', rank: 2, wins: 42, losses: 15},
    {id: 'tm3', name: 'Navi', logo: Images.avatars.player4, captain: 'Boom', country: 'UAE', rank: 3, wins: 38, losses: 18},
    {id: 'tm4', name: 'Cloud9', logo: Images.avatars.player1, captain: 'Tenz', country: 'CAN', rank: 4, wins: 35, losses: 20},
  ],
  
  schedule: [
    {
      id: 'm1',
      date: '10 Aug',
      time: '22:00',
      teamA: {name: 'Team Liquid', logo: Images.avatars.player2},
      teamB: {name: 'Cloud9', logo: Images.avatars.player1},
      status: 'upcoming',
    },
    {
      id: 'm2',
      date: '10 Aug',
      time: '23:00',
      teamA: {name: 'Fnatic', logo: Images.avatars.player3},
      teamB: {name: 'Navi', logo: Images.avatars.player4},
      status: 'upcoming',
    },
  ],
};
