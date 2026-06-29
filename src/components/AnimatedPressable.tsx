import React, {useCallback} from 'react';
import {
  Pressable,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {AnimationConfig} from '../theme/animations';

interface AnimatedPressableProps {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedPressableComponent: React.FC<AnimatedPressableProps> = ({
  onPress,
  style,
  children,
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withTiming(AnimationConfig.press.scaleDown, {duration: 100});
    opacity.value = withTiming(0.8, {duration: 100});
  }, [scale, opacity]);

  const handlePressOut = useCallback(() => {
    scale.value = withTiming(AnimationConfig.press.scaleUp, {duration: 120});
    opacity.value = withTiming(1, {duration: 120});
  }, [scale, opacity]);

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[animatedStyle, style]}>
      {children}
    </AnimatedPressable>
  );
};

export default React.memo(AnimatedPressableComponent);
