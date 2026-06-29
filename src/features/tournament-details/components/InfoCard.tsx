import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { DetailedTournament } from '../types';
import ProgressBar from '../../../components/ProgressBar';
import { Heading, Label, Caption } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import {
  SectionContainer,
  CardContainer,
  InfoRow,
  InfoItem,
} from './LayoutContainers';

interface InfoCardProps {
  tournament: DetailedTournament;
}

const InfoCard: React.FC<InfoCardProps> = ({ tournament }) => {
  const { progress, percentage } = useMemo(() => {
    const p = tournament.slotsUsed / tournament.slots;
    return {
      progress: p,
      percentage: Math.round(p * 100),
    };
  }, [tournament.slotsUsed, tournament.slots]);

  return (
    <SectionContainer style={styles.sectionOverride}>
      <CardContainer style={styles.cardOverride}>
        {/* Top Details Grid - Perfect 2 Column Layout */}
        <View style={styles.grid}>
          <InfoRow>
            <InfoItem
              icon="gamepad-variant"
              label="Game"
              value={tournament.gameName}
            />
            <InfoItem
              icon="sitemap"
              label="Format"
              value={`${tournament.teamSize} ${tournament.format}`}
            />
          </InfoRow>
          <InfoRow>
            <InfoItem
              icon="cash-multiple"
              label="Prize Pool"
              value={tournament.prizePool}
              highlight
            />
            <InfoItem
              icon="ticket-percent"
              label="Entry Fee"
              value={tournament.entryFee}
            />
          </InfoRow>
          <InfoRow>
            <InfoItem
              icon="monitor-cellphone"
              label="Platform"
              value={tournament.platform}
            />
            <InfoItem
              icon="earth"
              label="Region"
              value={tournament.serverRegion}
            />
          </InfoRow>
          <InfoRow>
            <InfoItem
              icon="account-multiple-plus"
              label="Total Slots"
              value={tournament.slots.toString()}
            />
            <InfoItem
              icon="account-group"
              label="Registered Teams"
              value={tournament.slotsUsed.toString()}
            />
          </InfoRow>
          <InfoRow>
            <InfoItem
              icon="calendar"
              label="Date"
              value={tournament.startDate}
            />
            <InfoItem
              icon="clock-outline"
              label="Time"
              value={tournament.startTime}
            />
          </InfoRow>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Label style={styles.slotsLabel}>Registration Progress</Label>
            <Heading style={styles.slotsValue}>{percentage}%</Heading>
          </View>
          <ProgressBar progress={progress} percentage={percentage} />
          <Caption style={styles.deadlineText}>
            Deadline: {tournament.registrationDeadline}
          </Caption>
        </View>
      </CardContainer>
    </SectionContainer>
  );
};

const styles = StyleSheet.create({
  sectionOverride: {
    marginTop: Spacing.xxl, // Replaces the negative margin
  },
  cardOverride: {
    zIndex: 20,
  },
  grid: {
    gap: Spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.borderLight,
    marginVertical: Spacing.lg,
  },
  progressSection: {
    marginTop: Spacing.xs,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.sm,
  },
  slotsLabel: {
    color: Colors.text.secondary,
  },
  slotsValue: {
    fontSize: 14,
    color: Colors.primary.main,
  },
  deadlineText: {
    color: Colors.danger.main,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});

export default React.memo(InfoCard);
