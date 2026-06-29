import React, {useCallback} from 'react';
import {
  Pressable,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(AnimationConfig.press.scaleDown, AnimationConfig.spring.snappy);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(AnimationConfig.press.scaleUp, AnimationConfig.spring.bouncy);
  }, [scale]);

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
