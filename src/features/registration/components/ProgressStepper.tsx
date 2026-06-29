import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Label } from '../../../components/Typography';

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  currentStep,
  totalSteps,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const progress = Math.max(0, Math.min(1, currentStep / totalSteps));
    return {
      width: withSpring(`${progress * 100}%`, {
        damping: 20,
        stiffness: 90,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Label style={styles.stepText}>
          Step {currentStep} of {totalSteps}
        </Label>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.bar, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  stepText: {
    color: Colors.text.muted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  track: {
    height: 4,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: Radius.full,
  },
});

export default React.memo(ProgressStepper);
