import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

/**
 * Width-proportional pixel value
 */
export const wp = (px: number): number =>
  Math.round((px / BASE_WIDTH) * width);

/**
 * Height-proportional pixel value
 */
export const hp = (px: number): number =>
  Math.round((px / BASE_HEIGHT) * height);

export const screenWidth = width;
export const screenHeight = height;

export const isSmallDevice = width < 375;
export const isTablet = width >= 768;
