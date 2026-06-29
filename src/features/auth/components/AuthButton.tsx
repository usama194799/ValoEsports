import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {Radius} from '../../../theme/radius';
import {Subheading} from '../../../components/Typography';

interface AuthButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const getBackgroundStyle = () => {
    if (variant === 'primary') return {backgroundColor: Colors.primary.main};
    if (variant === 'secondary') return {backgroundColor: Colors.dark.surface};
    return {backgroundColor: 'transparent'};
  };

  const getBorderStyle = () => {
    if (variant === 'outline') {
      return {
        borderWidth: 1,
        borderColor: Colors.neutral.borderLight,
      };
    }
    return {};
  };

  const getTextColor = () => {
    if (variant === 'primary') return Colors.neutral.white;
    return Colors.text.primary;
  };

  const isActuallyDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isActuallyDisabled}
      style={[
        styles.container,
        getBackgroundStyle(),
        getBorderStyle(),
        isActuallyDisabled && styles.disabled,
        style,
      ]}
      {...props}>
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Subheading style={[styles.label, {color: getTextColor()}]}>
          {label}
        </Subheading>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default React.memo(AuthButton);
