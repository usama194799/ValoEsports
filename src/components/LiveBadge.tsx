import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { Label } from './Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';

interface LiveBadgeProps {
  label?: string;
}

const LiveBadge: React.FC<LiveBadgeProps> = ({ label = 'Live' }) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 600 }),
        withTiming(1, { duration: 600 }),
      ),
      -1,
      false,
    );
  }, [opacity]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.badge}>
      <Animated.View style={[styles.dot, dotStyle]} />
      <Label style={styles.label}>{label}</Label>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.badge.liveBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: Radius.full,
    backgroundColor: Colors.text.primary,
  },
  label: {
    color: Colors.text.primary,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default React.memo(LiveBadge);
