import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {Colors} from '../theme/colors';
import {Radius} from '../theme/radius';
import {Spacing} from '../theme/spacing';
import {wp} from '../utils/responsive';

interface SkeletonCardProps {
  index?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({index = 0}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      index * 100,
      withRepeat(
        withSequence(
          withTiming(0.7, {duration: 800}),
          withTiming(0.3, {duration: 800}),
        ),
        -1,
        true,
      ),
    );
  }, [index, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* Banner Skeleton */}
      <View style={styles.banner} />
      
      {/* Content Skeleton */}
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleLine} />
        <View style={styles.subtitleLine} />

        {/* Row data */}
        <View style={styles.row}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </View>

        {/* Action Button */}
        <View style={styles.button} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: Radius.card,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    borderWidth: 0.5,
    borderColor: Colors.neutral.border,
  },
  banner: {
    height: wp(160),
    backgroundColor: Colors.dark.surface,
  },
  content: {
    padding: Spacing.lg,
  },
  titleLine: {
    height: 20,
    width: '60%',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.sm,
    marginBottom: Spacing.sm,
  },
  subtitleLine: {
    height: 14,
    width: '40%',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.sm,
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  box: {
    width: '28%',
    height: 48,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
  },
  button: {
    height: 44,
    width: '100%',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.full,
  },
});

export default React.memo(SkeletonCard);
