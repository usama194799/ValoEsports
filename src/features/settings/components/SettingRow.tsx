import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Heading, Label } from '../../../components/Typography';

interface SettingRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  value?: string;
  onPress: () => void;
  danger?: boolean;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  title,
  subtitle,
  value,
  onPress,
  danger,
}) => {
  const color = danger ? Colors.gaming.live : Colors.text.primary;
  const iconColor = danger ? Colors.gaming.live : Colors.primary.main;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContainer}>
        <View style={[styles.iconBox, danger && styles.iconBoxDanger]}>
          <Icon name={icon} size={22} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Heading style={[styles.title, { color }]}>{title}</Heading>
          {subtitle && <Label style={styles.subtitle}>{subtitle}</Label>}
        </View>
      </View>

      <View style={styles.rightContainer}>
        {value && <Label style={styles.value}>{value}</Label>}
        <Icon name="chevron-right" size={20} color={Colors.text.muted} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.neutral.borderLight,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(232, 33, 74, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  iconBoxDanger: {
    backgroundColor: 'rgba(232, 33, 74, 0.1)', // Error red with opacity
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginRight: Spacing.sm,
  },
});

export default SettingRow;
