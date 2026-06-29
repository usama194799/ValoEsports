import React from 'react';
import { StyleSheet, View, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Label, Subheading } from '../../../components/Typography';

interface SettingsToggleProps {
  icon: string;
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  icon,
  title,
  description,
  value,
  onValueChange,
  disabled,
}) => {
  return (
    <View style={[styles.container, disabled && styles.disabledContainer]}>
      <View style={styles.iconBox}>
        <Icon
          name={icon}
          size={24}
          color={disabled ? Colors.text.muted : Colors.primary.main}
        />
      </View>

      <View style={styles.textContainer}>
        <Subheading style={[styles.title, disabled && styles.disabledText]}>
          {title}
        </Subheading>
        {description ? (
          <Label style={styles.description}>{description}</Label>
        ) : null}
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: Colors.neutral.border, true: Colors.primary.glow }}
        thumbColor={value ? Colors.primary.main : Colors.text.muted}
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
  disabledContainer: {
    opacity: 0.5,
  },
  iconBox: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
  },
  title: {
    fontSize: 15,
    color: Colors.text.primary,
  },
  disabledText: {
    color: Colors.text.muted,
  },
  description: {
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 2,
  },
});

export default SettingsToggle;
