import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Radius } from '../theme/radius';
import { Heading } from './Typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const Button: React.FC<ButtonProps> = React.memo(
  ({
    title,
    onPress,
    variant = 'primary',
    size = 'large',
    disabled = false,
    loading = false,
    icon,
    style,
    textStyle,
  }) => {
    const getBackgroundColor = () => {
      if (disabled) return Colors.neutral.borderLight;
      switch (variant) {
        case 'primary':
          return Colors.primary.main;
        case 'secondary':
          return Colors.dark.surfaceLight;
        case 'outline':
          return 'transparent';
        case 'danger':
          return Colors.danger.main;
        case 'ghost':
          return 'transparent';
        default:
          return Colors.primary.main;
      }
    };

    const getBorderColor = () => {
      if (disabled) return 'transparent';
      if (variant === 'outline') return Colors.primary.main;
      return 'transparent';
    };

    const getTextColor = () => {
      if (disabled) return Colors.text.muted;
      switch (variant) {
        case 'primary':
          return Colors.neutral.white;
        case 'secondary':
          return Colors.text.primary;
        case 'outline':
          return Colors.primary.main;
        case 'danger':
          return Colors.neutral.white;
        case 'ghost':
          return Colors.primary.main;
        default:
          return Colors.neutral.white;
      }
    };

    const getHeight = () => {
      switch (size) {
        case 'small':
          return 36;
        case 'medium':
          return 48;
        case 'large':
          return 56;
        default:
          return 56;
      }
    };

    const getFontSize = () => {
      switch (size) {
        case 'small':
          return 14;
        case 'medium':
          return 16;
        case 'large':
          return 18;
        default:
          return 18;
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderWidth: variant === 'outline' ? 1 : 0,
            height: getHeight(),
            opacity: disabled ? 0.7 : 1,
          },
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <>
            {icon && (
              <Icon
                name={icon}
                size={getFontSize() + 4}
                color={getTextColor()}
                style={styles.icon}
              />
            )}
            <Heading
              style={[
                { color: getTextColor(), fontSize: getFontSize() },
                textStyle,
              ]}
            >
              {title}
            </Heading>
          </>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
  },
  icon: {
    marginRight: Spacing.sm,
  },
});

export default Button;
