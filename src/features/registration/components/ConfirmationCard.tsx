import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { Team } from '../../team/types/team';

interface ConfirmationCardProps {
  tournament: any;
  team: Team;
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  tournament,
  team,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Heading style={styles.title}>Registration Summary</Heading>
      </View>

      <View style={styles.section}>
        <Label style={styles.sectionLabel}>Tournament</Label>
        <Subheading style={styles.sectionValue}>{tournament.name}</Subheading>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Label style={styles.sectionLabel}>Selected Team</Label>
        <View style={styles.teamRow}>
          <Image source={{ uri: team.logoUrl }} style={styles.teamLogo} />
          <Subheading style={styles.teamName}>{team.name}</Subheading>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.flexItem}>
          <Label style={styles.sectionLabel}>Entry Fee</Label>
          <Subheading style={styles.feeValue}>{tournament.entryFee}</Subheading>
        </View>
        <View style={styles.flexItem}>
          <Label style={styles.sectionLabel}>Prize Pool</Label>
          <Subheading style={styles.prizeValue}>
            {tournament.prizePool}
          </Subheading>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Icon name="shield-check" size={20} color={Colors.success.main} />
        <Label style={styles.footerText}>Team requirements verified</Label>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  header: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 18,
  },
  section: {
    marginVertical: Spacing.sm,
  },
  sectionLabel: {
    fontSize: 12,
    color: Colors.text.muted,
    marginBottom: Spacing.xs,
  },
  sectionValue: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.borderLight,
    marginVertical: Spacing.sm,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 4,
  },
  teamLogo: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
  },
  teamName: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.sm,
  },
  flexItem: {
    flex: 1,
  },
  feeValue: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  prizeValue: {
    fontSize: 16,
    color: Colors.gaming.rankGold,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    backgroundColor: Colors.success.transparent.light,
    padding: Spacing.sm,
    borderRadius: Radius.md,
  },
  footerText: {
    color: Colors.success.main,
    fontWeight: '600',
    fontSize: 13,
  },
});

export default React.memo(ConfirmationCard);
