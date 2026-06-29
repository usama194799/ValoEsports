export interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  country: string;
  region: string;
  dob: string;
  bio: string;
  favoriteGame: string;
  avatar: string;
  coverImage: string;
  level: number;
  isVerified: boolean;
}

export interface DeviceSession {
  id: string;
  name: string;
  platform: 'Desktop' | 'Mobile' | 'Tablet';
  location: string;
  lastActive: string;
  isCurrent: boolean;
  icon: string;
}

export interface ConnectedAccount {
  id: string;
  provider: 'Discord' | 'Steam' | 'Xbox' | 'PlayStation' | 'Google' | 'Apple';
  username: string;
  isConnected: boolean;
  icon: string;
  color: string;
}

export const MOCK_USER_PROFILE: UserProfile = {
  fullName: 'Alex Mercer',
  username: 'AlexMercer99',
  email: 'alex.mercer@example.com',
  phone: '+92 300 1234567',
  country: 'Pakistan',
  region: 'Asia',
  dob: '1995-08-15',
  bio: 'Professional Valorant player and content creator.',
  favoriteGame: 'Valorant',
  avatar: 'https://i.pravatar.cc/150?u=alex',
  coverImage:
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070',
  level: 42,
  isVerified: true,
};

export const MOCK_DEVICES: DeviceSession[] = [
  {
    id: 'dev_1',
    name: 'iPhone 14 Pro Max',
    platform: 'Mobile',
    location: 'Lahore, PK',
    lastActive: 'Active Now',
    isCurrent: true,
    icon: 'cellphone',
  },
  {
    id: 'dev_2',
    name: 'Windows PC - Chrome',
    platform: 'Desktop',
    location: 'Lahore, PK',
    lastActive: '2 hours ago',
    isCurrent: false,
    icon: 'desktop-mac',
  },
  {
    id: 'dev_3',
    name: 'iPad Air',
    platform: 'Tablet',
    location: 'Islamabad, PK',
    lastActive: '3 days ago',
    isCurrent: false,
    icon: 'tablet-ipad',
  },
];

export const MOCK_CONNECTED_ACCOUNTS: ConnectedAccount[] = [
  {
    id: 'acc_discord',
    provider: 'Discord',
    username: 'AlexMercer#1234',
    isConnected: true,
    icon: 'discord',
    color: '#5865F2',
  },
  {
    id: 'acc_steam',
    provider: 'Steam',
    username: 'AlexM99',
    isConnected: true,
    icon: 'steam',
    color: '#171A21',
  },
  {
    id: 'acc_xbox',
    provider: 'Xbox',
    username: '',
    isConnected: false,
    icon: 'microsoft-xbox',
    color: '#107C10',
  },
  {
    id: 'acc_ps',
    provider: 'PlayStation',
    username: '',
    isConnected: false,
    icon: 'sony-playstation',
    color: '#00439C',
  },
  {
    id: 'acc_google',
    provider: 'Google',
    username: 'alex.mercer@gmail.com',
    isConnected: true,
    icon: 'google',
    color: '#DB4437',
  },
  {
    id: 'acc_apple',
    provider: 'Apple',
    username: '',
    isConnected: false,
    icon: 'apple',
    color: '#FFFFFF', // Actually we'll use text.primary for apple icon in dark mode
  },
];
