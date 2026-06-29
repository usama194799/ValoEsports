import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';

const SkeletonItem: React.FC<{
  width: number | string;
  height: number;
  style?: any;
}> = ({ width, height, style }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.3, { duration: 800 }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[styles.skeletonBase, { width, height }, style, animatedStyle]}
    />
  );
};

const SkeletonDetails: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Hero Skeleton */}
      <SkeletonItem width="100%" height={280} style={styles.hero} />

      {/* Info Card Skeleton */}
      <View style={styles.card}>
        <View style={styles.row}>
          <SkeletonItem width={120} height={20} />
          <SkeletonItem width={100} height={20} />
        </View>
        <View style={styles.row}>
          <SkeletonItem width={140} height={20} />
          <SkeletonItem width={110} height={20} />
        </View>
        <View style={styles.row}>
          <SkeletonItem width={130} height={20} />
          <SkeletonItem width={90} height={20} />
        </View>
        <View style={styles.divider} />
        <SkeletonItem width="100%" height={8} style={styles.skeletonBar} />
      </View>

      {/* Description Skeleton */}
      <View style={styles.section}>
        <SkeletonItem width={160} height={24} style={styles.skeletonTitle} />
        <SkeletonItem
          width="100%"
          height={16}
          style={styles.skeletonTextLine}
        />
        <SkeletonItem width="90%" height={16} style={styles.skeletonTextLine} />
        <SkeletonItem width="80%" height={16} />
      </View>

      {/* Prizes Skeleton */}
      <View style={styles.section}>
        <SkeletonItem width={120} height={24} style={styles.skeletonTitle} />
        <View style={styles.prizesRow}>
          <SkeletonItem width={140} height={160} style={styles.prizeCard} />
          <SkeletonItem width={140} height={160} style={styles.prizeCard} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  skeletonBase: {
    backgroundColor: Colors.dark.surfaceLight,
    borderRadius: Radius.sm,
  },
  hero: {
    borderRadius: 0,
  },
  card: {
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginTop: -Spacing.xl,
    gap: Spacing.lg,
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.borderLight,
    marginTop: Spacing.md,
  },
  section: {
    padding: Spacing.lg,
    marginTop: Spacing.md,
  },
  skeletonBar: {
    borderRadius: 4,
    marginTop: 10,
  },
  skeletonTitle: {
    marginBottom: 16,
  },
  skeletonTextLine: {
    marginBottom: 8,
  },
  prizesRow: {
    flexDirection: 'row',
    gap: 16,
  },
  prizeCard: {
    borderRadius: 12,
  },
});

export default React.memo(SkeletonDetails);
