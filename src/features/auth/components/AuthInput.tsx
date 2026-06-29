import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../theme/colors';
import {Radius} from '../../../theme/radius';
import {Spacing} from '../../../theme/spacing';

export interface AuthInputProps extends TextInputProps {
  label: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  value,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const focusAnim = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    focusAnim.value = withTiming(isFocused || value ? 1 : 0, {duration: 200});
  }, [isFocused, value, focusAnim]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const labelStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(focusAnim.value, [0, 1], [16, -10]),
      left: leftIcon ? interpolate(focusAnim.value, [0, 1], [40, 16]) : 16,
      fontSize: interpolate(focusAnim.value, [0, 1], [16, 12]),
      color: interpolateColor(
        focusAnim.value,
        [0, 1],
        [Colors.text.muted, isFocused ? Colors.primary.main : Colors.text.secondary],
      ),
    };
  });

  const borderStyle = {
    borderColor: error
      ? Colors.danger.main
      : isFocused
      ? Colors.primary.main
      : Colors.neutral.borderLight,
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, borderStyle]}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={
              error
                ? Colors.danger.main
                : isFocused
                ? Colors.primary.main
                : Colors.text.muted
            }
            style={styles.leftIcon}
          />
        )}
        
        {/* Floating Label Container */}
        <Animated.View
          style={[
            styles.labelContainer,
            labelStyle,
            {backgroundColor: Colors.dark.background},
          ]}
          pointerEvents="none">
          <Text
            style={{
              color: error
                ? Colors.danger.main
                : isFocused
                ? Colors.primary.main
                : Colors.text.muted,
              fontSize: 12,
            }}>
            {label}
          </Text>
        </Animated.View>

        <TextInput
          ref={inputRef}
          style={[styles.input, leftIcon ? {paddingLeft: 0} : {}]}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="transparent" // Placeholder handled by floating label
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={!onRightIconPress}>
            <Icon
              name={rightIcon}
              size={20}
              color={Colors.text.muted}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};



const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.lg,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderRadius: Radius.md,
    backgroundColor: Colors.dark.surface,
  },
  leftIcon: {
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  rightIcon: {
    padding: Spacing.sm,
    marginRight: Spacing.xs,
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  input: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 16,
    paddingHorizontal: Spacing.md,
    height: '100%',
  },
  errorText: {
    color: Colors.danger.main,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default React.memo(AuthInput);
