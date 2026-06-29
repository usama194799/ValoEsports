import { Platform } from 'react-native';

export const Shadows = {
  card: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }),

  cardHeavy: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
    },
    android: {
      elevation: 16,
    },
    default: {},
  }),

  fab: Platform.select({
    ios: {
      shadowColor: '#E8214A',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
    },
    android: {
      elevation: 12,
    },
    default: {},
  }),

  playButton: Platform.select({
    ios: {
      shadowColor: '#E8214A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
    },
    android: {
      elevation: 10,
    },
    default: {},
  }),

  header: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
} as const;
