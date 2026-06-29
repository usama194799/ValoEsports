import { Spacing } from '../theme/spacing';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Label } from './Typography';
import { Colors, } from '../theme/colors';
import { Radius } from '../theme/radius';

interface ProgressBarProps {
  progress: number; // 0–1
  label?: string;
  percentage?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  percentage,
}) => {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress, { duration: 800 });
  }, [progress, width]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  return (
    <View>
      {label !== undefined ? (
        <View style={styles.labelRow}>
          <Label style={styles.label}>{label}</Label>
          {percentage !== undefined ? (
            <Label style={styles.percentage}>{percentage}%</Label>
          ) : null}
        </View>
      ) : null}
      <View style={styles.track}>
        <Animated.View style={[styles.fill, barStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  label: {
    color: Colors.text.secondary,
    fontSize: 9,
  },
  percentage: {
    color: Colors.text.secondary,
    fontSize: 9,
    fontWeight: '700',
  },
  track: {
    height: 4,
    backgroundColor: Colors.progress.bg,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.progress.fill,
    borderRadius: Radius.full,
  },
});

export default React.memo(ProgressBar);
