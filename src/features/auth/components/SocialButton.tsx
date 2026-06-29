import React from 'react';
import {StyleSheet, TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../theme/colors';
import {Radius} from '../../../theme/radius';
import {Spacing} from '../../../theme/spacing';
import {Label} from '../../../components/Typography';

interface SocialButtonProps extends TouchableOpacityProps {
  provider: 'google' | 'apple' | 'discord';
  label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  label,
  style,
  ...props
}) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {icon: 'google', color: '#DB4437'};
      case 'apple':
        return {icon: 'apple', color: '#FFFFFF'};
      case 'discord':
        return {icon: 'discord', color: '#5865F2'};
      default:
        return {icon: 'help', color: '#FFFFFF'};
    }
  };

  const {icon, color} = getProviderConfig();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, style]}
      {...props}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={22} color={color} />
      </View>
      <Label style={styles.label}>{label}</Label>
      <View style={styles.iconContainer} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.primary,
  },
});

export default React.memo(SocialButton);
