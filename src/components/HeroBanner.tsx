import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Heading, Caption } from './Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Shadows } from '../theme/shadow';
import { Spacing } from '../theme/spacing';
import { wp } from '../utils/responsive';

interface HeroBannerProps {
  gameName: string;
  tournamentName: string;
  date: string;
  time: string;
  image: string;
  onPlay?: () => void;
  scrollY?: SharedValue<number>;
}

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = wp(240);

const HeroBanner: React.FC<HeroBannerProps> = ({
  gameName,
  tournamentName,
  date,
  time,
  image,
  onPlay,
  scrollY,
}) => {
  const parallaxStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const translateY = interpolate(
      scrollY.value,
      [0, BANNER_HEIGHT],
      [0, BANNER_HEIGHT * 0.4],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{ translateY }],
    };
  });

  const imageSource = useMemo(() => ({ uri: image }), [image]);

  return (
    <View style={[styles.container, Shadows.cardHeavy]}>
      <Animated.Image
        sharedTransitionTag={`hero-banner-${tournamentName}`}
        source={imageSource}
        style={[styles.image, parallaxStyle]}
        resizeMode="cover"
      />
      {/* Gradient Overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(13,13,26,0.55)', '#0D0D1A']}
        locations={[0.2, 0.6, 1]}
        style={styles.gradient}
      />
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Caption style={styles.gameName}>{gameName}</Caption>
          <Heading style={styles.tournamentName}>{tournamentName}</Heading>
          <Caption style={styles.dateTime}>
            {date}
            {'  •  '}
            {time}
          </Caption>
        </View>
        {/* Play Button */}
        <TouchableOpacity
          onPress={onPlay}
          activeOpacity={0.85}
          style={[styles.playButton, Shadows.playButton]}
        >
          <Icon name="chevron-right" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.card,
    overflow: 'hidden',
    height: BANNER_HEIGHT,
    backgroundColor: Colors.dark.card,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '75%',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  textBlock: {
    flex: 1,
    marginRight: Spacing.md,
  },
  gameName: {
    marginBottom: 2,
  },
  tournamentName: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  dateTime: {},
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
});

export default React.memo(HeroBanner);
