import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { Heading, Label, Subheading } from '../../../components/Typography';

const BANNER_HEIGHT = 220;

interface TeamBannerProps {
  bannerUrl: string;
  logoUrl: string;
  teamName: string;
  game: string;
  scrollY: SharedValue<number>;
}

const TeamBanner: React.FC<TeamBannerProps> = ({
  bannerUrl,
  logoUrl,
  teamName,
  game,
  scrollY,
}) => {
  const animatedBannerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-BANNER_HEIGHT, 0, BANNER_HEIGHT],
      [-BANNER_HEIGHT / 2, 0, BANNER_HEIGHT * 0.5],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      scrollY.value,
      [-BANNER_HEIGHT, 0],
      [2, 1],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: bannerUrl }}
        style={[styles.banner, animatedBannerStyle]}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(10,10,14,0.8)', Colors.dark.background]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <Image source={{ uri: logoUrl }} style={styles.logo} />
        </View>
        <Heading style={styles.name}>{teamName}</Heading>
        <View style={styles.badgeRow}>
          <View style={styles.gameBadge}>
            <Icon
              name="gamepad-variant-outline"
              size={14}
              color={Colors.primary.main}
            />
            <Label style={styles.gameText}>{game}</Label>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    width: '100%',
    overflow: 'hidden',
  },
  banner: {
    ...(StyleSheet.absoluteFill as any),
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...(StyleSheet.absoluteFill as any),
  },
  content: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
    alignItems: 'center',
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: Radius.lg,
    borderWidth: 3,
    borderColor: Colors.dark.background,
    backgroundColor: Colors.dark.surface,
    marginBottom: Spacing.md,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: Radius.lg - 3,
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gameBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.transparent.light,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.full,
    gap: 4,
  },
  gameText: {
    color: Colors.primary.main,
    fontWeight: '700',
    fontSize: 12,
  },
});

export default React.memo(TeamBanner);
