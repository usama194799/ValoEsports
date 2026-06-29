import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Heading, Subheading} from '../../../components/Typography';
import BadgeChip from '../../../components/BadgeChip';
import LiveBadge from '../../../components/LiveBadge';
import OpenBadge from '../../../components/OpenBadge';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {wp} from '../../../utils/responsive';

interface HeroBannerProps {
  banner: string;
  name: string;
  organizerName: string;
  status: 'live' | 'open' | 'closed' | 'upcoming';
  scrollY: SharedValue<number>;
  isFavorite: boolean;
  onFavorite: () => void;
  onShare: () => void;
}

const HEADER_MAX_HEIGHT = wp(280);

const HeroBanner: React.FC<HeroBannerProps> = ({
  banner,
  name,
  organizerName,
  status,
  scrollY,
  isFavorite,
  onFavorite,
  onShare,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // The height when fully collapsed (Safe Area + generic navbar height)
  const HEADER_MIN_HEIGHT = useMemo(() => insets.top + 60, [insets.top]);
  const SCROLL_DISTANCE = useMemo(() => HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, [HEADER_MIN_HEIGHT]);

  const containerStyle = useAnimatedStyle(() => {
    // Container translates up as we scroll, but stops at -SCROLL_DISTANCE to remain sticky
    const translateY = interpolate(
      scrollY.value,
      [-100, 0, SCROLL_DISTANCE, SCROLL_DISTANCE + 1],
      [0, 0, -SCROLL_DISTANCE, -SCROLL_DISTANCE],
    );
    return {
      transform: [{translateY}],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    // Parallax effect: image translates slightly down relative to container so it doesn't move up as fast
    const translateY = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [0, SCROLL_DISTANCE * 0.4],
      Extrapolation.CLAMP,
    );
    // Scale on pull down
    const scale = interpolate(
      scrollY.value,
      [-100, 0],
      [1.3, 1],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateY}, {scale}],
    };
  });

  const contentOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE * 0.7],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return {opacity};
  });

  const headerBgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [SCROLL_DISTANCE * 0.7, SCROLL_DISTANCE],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      backgroundColor: Colors.dark.background,
      opacity,
    };
  });

  const renderBadge = () => {
    switch (status) {
      case 'live':
        return <LiveBadge />;
      case 'open':
        return <OpenBadge />;
      case 'upcoming':
        return <BadgeChip label="Upcoming" icon="clock-outline" />;
      case 'closed':
        return <BadgeChip label="Closed" icon="lock-outline" />;
    }
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.imageContainer, imageStyle]}>
        <Animated.Image
          source={{uri: banner}}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Gradient Overlay remains fixed inside the image container */}
        <LinearGradient
          colors={['transparent', 'rgba(13,13,26,0.6)', '#0D0D1A']}
          locations={[0.3, 0.7, 1]}
          style={styles.gradient}
        />
      </Animated.View>

      {/* Floating Header Actions (Pinned to the top of the container) */}
      <View style={[styles.headerActions, {paddingTop: insets.top + Spacing.sm}]}>
        <Animated.View style={[StyleSheet.absoluteFill, headerBgStyle]} />
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={onShare} activeOpacity={0.8}>
            <Icon name="share-variant" size={22} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={onFavorite} activeOpacity={0.8}>
            <Icon
              name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
              size={24}
              color={isFavorite ? Colors.primary.main : Colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Details Content */}
      <Animated.View style={[styles.content, contentOpacity]}>
        <View style={styles.badgeWrapper}>{renderBadge()}</View>
        <Heading style={styles.title} numberOfLines={2}>{name}</Heading>
        <View style={styles.orgWrapper}>
          <Subheading style={styles.orgText}>By {organizerName}</Subheading>
          <Icon name="check-decagram" size={16} color={Colors.primary.main} />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    zIndex: 10,
    backgroundColor: Colors.dark.background, // Prevents gap when pulled down
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    zIndex: 20,
    // Provide a minimum height area so touches work
    height: 100, 
  },
  rightActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
  },
  badgeWrapper: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    marginBottom: Spacing.xs,
  },
  orgWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orgText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
});

export default React.memo(HeroBanner);
