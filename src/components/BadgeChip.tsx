import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../theme/colors';
import {Radius} from '../theme/radius';
import {Spacing} from '../theme/spacing';

interface BadgeChipProps {
  icon?: string;
  label: string;
  style?: ViewStyle;
}

const BadgeChip: React.FC<BadgeChipProps> = ({icon, label, style}) => {
  return (
    <View style={[styles.chip, style]}>
      {icon ? (
        <Icon name={icon} size={10} color={Colors.text.secondary} />
      ) : null}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.badge.bg,
    borderWidth: 0.5,
    borderColor: Colors.badge.border,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    gap: 3,
  },
  label: {
    fontSize: 9,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
});

export default React.memo(BadgeChip);
