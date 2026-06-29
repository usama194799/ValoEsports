import { Platform, TextStyle } from 'react-native';
import { Colors } from './colors';

const fontFamily = Platform.select({
  android: 'sans-serif',
  ios: 'System',
  default: 'System',
});

const fontFamilyBold = Platform.select({
  android: 'sans-serif-medium',
  ios: 'System',
  default: 'System',
});

export const Typography = {
  headingXL: {
    fontFamily: fontFamilyBold,
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text.primary,
    letterSpacing: 0.5,
  } as TextStyle,

  headingL: {
    fontFamily: fontFamilyBold,
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text.primary,
    letterSpacing: 0.3,
  } as TextStyle,

  headingM: {
    fontFamily: fontFamilyBold,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    letterSpacing: 0.2,
  } as TextStyle,

  headingS: {
    fontFamily: fontFamilyBold,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    letterSpacing: 0.1,
  } as TextStyle,

  body: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.text.primary,
    lineHeight: 20,
  } as TextStyle,

  bodyMedium: {
    fontFamily: fontFamilyBold,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.primary,
  } as TextStyle,

  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    color: Colors.text.secondary,
    lineHeight: 16,
  } as TextStyle,

  captionBold: {
    fontFamily: fontFamilyBold,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.primary,
  } as TextStyle,

  small: {
    fontFamily,
    fontSize: 10,
    fontWeight: '400',
    color: Colors.text.muted,
  } as TextStyle,

  smallBold: {
    fontFamily: fontFamilyBold,
    fontSize: 10,
    fontWeight: '600',
    color: Colors.text.secondary,
  } as TextStyle,

  badge: {
    fontFamily: fontFamilyBold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  } as TextStyle,

  username: {
    fontFamily: fontFamilyBold,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text.primary,
    letterSpacing: 0.8,
  } as TextStyle,

  seeAll: {
    fontFamily,
    fontSize: 13,
    fontWeight: '400',
    color: Colors.text.secondary,
  } as TextStyle,

  points: {
    fontFamily: fontFamilyBold,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.success,
  } as TextStyle,

  games: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    color: Colors.text.secondary,
  } as TextStyle,
} as const;
