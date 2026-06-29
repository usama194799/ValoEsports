import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

interface SuccessCardProps {
  tournament: any;
  team: any;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ tournament, team }) => {
  return (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.card}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <Icon name="check-decagram" size={64} color={Colors.primary.main} />
        </View>
      </View>

      <Heading style={styles.title}>Registration Complete!</Heading>
      <Label style={styles.subtitle}>
        You have successfully registered {team.name} for the tournament.
      </Label>

      <View style={styles.detailsBox}>
        <View style={styles.detailRow}>
          <Label style={styles.detailLabel}>Tournament</Label>
          <Subheading style={styles.detailValue} numberOfLines={1}>
            {tournament.name}
          </Subheading>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          <Label style={styles.detailLabel}>Starts On</Label>
          <Subheading style={styles.detailValue}>
            {tournament.startDate}
          </Subheading>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.neutral.whiteTransparent.light,
  },
  iconWrapper: {
    marginBottom: Spacing.xl,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary.transparent.light,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary.transparent.dark,
  },
  title: {
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.muted,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  detailsBox: {
    width: '100%',
    backgroundColor: Colors.dark.surface,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.text.muted,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.text.secondary,
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.borderLight,
    marginVertical: Spacing.md,
  },
});

export default React.memo(SuccessCard);
