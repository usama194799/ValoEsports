import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading, Label } from './Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Spacing } from '../theme/spacing';

interface Props {
  title: string;
  value: string | number;
}

const StatCard: React.FC<Props> = ({ title, value }) => {
  return (
    <View style={styles.card}>
      <Heading style={styles.value}>{value}</Heading>
      <Label style={styles.title}>{title}</Label>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flex: 1,
    marginRight: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 24,
    color: Colors.primary.main,
    marginBottom: Spacing.xs,
  },
  title: {
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});

export default StatCard;
