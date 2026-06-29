import React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Heading, Label } from '../../../components/Typography';

interface SettingToggleProps {
  icon: string;
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const SettingToggle: React.FC<SettingToggleProps> = ({
  icon,
  title,
  description,
  value,
  onValueChange,
  disabled,
}) => {
  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      <View style={styles.iconBox}>
        <Icon
          name={icon}
          size={22}
          color={disabled ? Colors.text.muted : Colors.primary.main}
        />
      </View>
      <View style={styles.textContainer}>
        <Heading
          style={[styles.title, disabled && { color: Colors.text.muted }]}
        >
          {title}
        </Heading>
        {description && <Label style={styles.description}>{description}</Label>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: Colors.dark.cardAlt, true: Colors.gaming.open }}
        thumbColor={value ? Colors.neutral.white : Colors.text.muted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.neutral.borderLight,
  },
  disabled: {
    opacity: 0.5,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.primary.transparent.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  title: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  description: {
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 2,
    lineHeight: 16,
  },
});

export default SettingToggle;
