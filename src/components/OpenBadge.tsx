import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';

interface OpenBadgeProps {
  label?: string;
}

const OpenBadge: React.FC<OpenBadgeProps> = ({ label = 'Open' }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.badge.openBg,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.primary,
  },
});

export default React.memo(OpenBadge);
