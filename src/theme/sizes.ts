import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const wp = (px: number): number => (px / BASE_WIDTH) * width;
export const hp = (px: number): number => (px / BASE_HEIGHT) * height;

export const screenWidth = width;
export const screenHeight = height;

export const isSmallDevice = width < 375;
export const isTablet = width >= 768;

export const Sizes = {
  screenWidth: width,
  screenHeight: height,

  // Header
  headerHeight: 64,
  avatarSize: 42,
  avatarBorderWidth: 2,
  settingsIconSize: 38,

  // Hero Banner
  heroBannerHeight: wp(220),
  heroPlayButtonSize: 44,

  // Tournament Cards
  tournamentCardWidth: wp(180),
  tournamentCardHeight: wp(190),
  tournamentCardImageHeight: wp(108),

  // Upcoming Cards
  upcomingCardWidth: wp(180),
  upcomingCardHeight: wp(210),

  // Leaderboard
  leaderboardAvatarSize: 48,
  rankBadgeSize: 22,

  // Bottom Nav
  bottomNavHeight: 72,
  fabSize: 56,
  fabIconSize: 26,
  navIconSize: 22,

  // Icon sizes
  iconSm: 12,
  iconMd: 14,
  iconLg: 18,
} as const;
