import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Radius } from '../theme/radius';
import { Label } from './Typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  isPassword?: boolean;
}

const TextInput: React.FC<TextInputProps> = React.memo(
  ({
    label,
    error,
    leftIcon,
    rightIcon,
    onRightIconPress,
    isPassword,
    style,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(isPassword);

    const handleFocus = useCallback(
      (e: any) => {
        setIsFocused(true);
        props.onFocus?.(e);
      },
      [props.onFocus],
    );

    const handleBlur = useCallback(
      (e: any) => {
        setIsFocused(false);
        props.onBlur?.(e);
      },
      [props.onBlur],
    );

    const toggleSecureEntry = useCallback(() => {
      setIsSecure(prev => !prev);
    }, []);

    const getBorderColor = () => {
      if (error) return Colors.danger.main;
      if (isFocused) return Colors.primary.main;
      return Colors.neutral.borderLight;
    };

    return (
      <View style={styles.container}>
        {label && <Label style={styles.label}>{label}</Label>}

        <View
          style={[
            styles.inputContainer,
            { borderColor: getBorderColor() },
            isFocused && styles.inputContainerFocused,
            error && styles.inputContainerError,
            style,
          ]}
        >
          {leftIcon && (
            <Icon
              name={leftIcon}
              size={20}
              color={isFocused ? Colors.primary.main : Colors.text.muted}
              style={styles.leftIcon}
            />
          )}

          <RNTextInput
            style={styles.input}
            placeholderTextColor={Colors.text.muted}
            secureTextEntry={isSecure}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {isPassword ? (
            <TouchableOpacity
              onPress={toggleSecureEntry}
              style={styles.rightIcon}
            >
              <Icon
                name={isSecure ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={Colors.text.muted}
              />
            </TouchableOpacity>
          ) : rightIcon ? (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.rightIcon}
              disabled={!onRightIconPress}
            >
              <Icon name={rightIcon} size={20} color={Colors.text.muted} />
            </TouchableOpacity>
          ) : null}
        </View>

        {error && <Label style={styles.errorText}>{error}</Label>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderRadius: Radius.md,
    height: 56, // Consistent height for all inputs
    paddingHorizontal: Spacing.md,
  },
  inputContainerFocused: {
    backgroundColor: Colors.dark.surfaceLight,
  },
  inputContainerError: {
    backgroundColor: 'rgba(255, 76, 76, 0.05)',
  },
  input: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 16,
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    marginLeft: Spacing.sm,
  },
  errorText: {
    fontSize: 12,
    color: Colors.danger.main,
    marginTop: Spacing.xs,
  },
});

export default TextInput;
