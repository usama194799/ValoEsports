import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  FadeInUp,
} from 'react-native-reanimated';
import { Label, Heading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';

interface StatCardProps {
  label: string;
  value: string | number;
  delay?: number;
  highlight?: boolean;
  style?: StyleProp<ViewStyle>;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delay = 0,
  highlight,
  style,
}) => {
  const isNumeric = typeof value === 'number';
  // Note: True animated counting requires more complex logic (e.g. useDerivedValue),
  // but for the visual "fade up" presentation we use standard reanimated Layout Animations.

  return (
    <View
      style={[styles.container, highlight && styles.highlightContainer, style]}
    >
      <Label style={styles.label}>{label}</Label>
      <Heading style={[styles.value, highlight && styles.highlightValue]}>
        {value}
      </Heading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.surface,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    flex: 1,
  },
  highlightContainer: {
    backgroundColor: Colors.primary.glow,
    borderColor: Colors.primary.main,
  },
  label: {
    color: Colors.text.muted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  value: {
    fontSize: 24,
    color: Colors.text.primary,
  },
  highlightValue: {
    color: Colors.primary.main,
  },
});

export default React.memo(StatCard);
