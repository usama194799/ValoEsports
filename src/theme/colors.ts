export const Colors = {
  // Theme Backgrounds
  dark: {
    background: '#0D0D1A',
    surface: '#1E1E30',
    surfaceLight: '#252538',
    card: '#13131F',
    cardAlt: '#1A1A2E',
  },

  // Gaming Specific
  gaming: {
    live: '#E8214A',
    open: '#00C853',
    rankGold: '#FFD700',
    rankSilver: '#C0C0C0',
    rankBronze: '#CD7F32',
    avatarRing: '#E8214A',
  },

  // Leaderboard
  leaderboard: {
    rank1Bg: '#C19B4B',
    rank2Bg: '#C45A39',
    rank3Bg: '#0D8FD5',
    rank4Bg: '#32364A',
  },

  // Core Palette
  primary: {
    main: '#E8214A',
    dark: '#C41A3C',
    glow: 'rgba(232, 33, 74, 0.3)',
  },
  secondary: {
    main: '#1E1E30',
    light: '#252538',
  },
  accent: {
    main: '#A0A0B8',
    muted: '#6B6B85',
  },
  danger: {
    main: '#FF4C4C',
  },
  success: {
    main: '#00C853',
    dark: '#00A844',
  },
  warning: {
    main: '#FFD700',
  },
  neutral: {
    white: '#FFFFFF',
    transparent: 'transparent',
    overlay: 'rgba(0,0,0,0.5)',
    border: 'rgba(255, 255, 255, 0.08)',
    borderLight: 'rgba(255, 255, 255, 0.12)',
  },

  // Typography
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0B8',
    muted: '#6B6B85',
    accent: '#E8214A',
    success: '#00C853',
  },

  // Component Mappings
  nav: {
    bg: '#0D0D1A',
    border: 'rgba(255, 255, 255, 0.06)',
    active: '#E8214A',
    inactive: '#4A4A65',
  },
  badge: {
    bg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.12)',
    liveBg: '#E8214A',
    openBg: '#00C853',
  },
  progress: {
    bg: 'rgba(255, 255, 255, 0.1)',
    fill: '#00C853',
  },
  gradients: {
    hero: ['transparent', 'rgba(13, 13, 26, 0.55)', '#0D0D1A'],
    card: ['transparent', 'rgba(13, 13, 26, 0.85)'],
  },
} as const;
