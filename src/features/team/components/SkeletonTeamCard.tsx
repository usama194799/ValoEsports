import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import {Colors} from '../../../theme/colors';
import {Radius} from '../../../theme/radius';
import {Spacing} from '../../../theme/spacing';

const SkeletonItem: React.FC<{width: number | string; height: number; style?: any}> = ({
  width,
  height,
  style,
}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, {duration: 800}),
        withTiming(0.3, {duration: 800}),
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
      style={[
        styles.skeletonBase,
        {width, height},
        style,
        animatedStyle,
      ]}
    />
  );
};

const SkeletonTeamCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <SkeletonItem width={56} height={56} style={{borderRadius: Radius.md}} />
        <View style={styles.headerInfo}>
          <SkeletonItem width={120} height={20} style={{marginBottom: 8}} />
          <SkeletonItem width={160} height={14} />
        </View>
      </View>
      <View style={styles.statsRow}>
        <SkeletonItem width="100%" height={50} style={{borderRadius: Radius.md}} />
      </View>
      <SkeletonItem width="100%" height={44} style={{borderRadius: Radius.md}} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  statsRow: {
    marginBottom: Spacing.md,
  },
  skeletonBase: {
    backgroundColor: Colors.dark.surfaceLight,
    borderRadius: Radius.sm,
  },
});

export default React.memo(SkeletonTeamCard);
