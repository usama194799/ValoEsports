import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { TournamentMatch } from '../types';
import {
  Heading,
  Label,
  Subheading,
  Caption,
} from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { SectionContainer } from './LayoutContainers';

interface MatchScheduleProps {
  schedule: TournamentMatch[];
}

const MatchCard: React.FC<{ match: TournamentMatch }> = ({ match }) => {
  const isLive = match.status === 'live';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Caption style={styles.date}>
          {match.date} • {match.time}
        </Caption>
        {isLive && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Label style={styles.liveText}>LIVE</Label>
          </View>
        )}
      </View>

      <View style={styles.teamsWrapper}>
        {/* Team A */}
        <View style={styles.team}>
          <Image source={{ uri: match.teamA.logo }} style={styles.logo} />
          <Subheading style={styles.teamName} numberOfLines={1}>
            {match.teamA.name}
          </Subheading>
        </View>

        {/* VS or Score */}
        <View style={styles.centerCol}>
          {match.status === 'completed' || isLive ? (
            <Heading style={styles.scoreText}>
              {match.scoreA} - {match.scoreB}
            </Heading>
          ) : (
            <Heading style={styles.vsText}>VS</Heading>
          )}
        </View>

        {/* Team B */}
        <View style={styles.team}>
          <Image source={{ uri: match.teamB.logo }} style={styles.logo} />
          <Subheading style={styles.teamName} numberOfLines={1}>
            {match.teamB.name}
          </Subheading>
        </View>
      </View>
    </View>
  );
};

const MatchSchedule: React.FC<MatchScheduleProps> = ({ schedule }) => {
  if (!schedule || schedule.length === 0) return null;

  return (
    <SectionContainer title="Match Schedule">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {schedule.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </ScrollView>
    </SectionContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  card: {
    width: 280,
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  date: {
    color: Colors.text.muted,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.transparent.light,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gaming.live,
  },
  liveText: {
    color: Colors.gaming.live,
    fontSize: 10,
    fontWeight: '700',
  },
  teamsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.surface,
    marginBottom: Spacing.xs,
  },
  teamName: {
    fontSize: 12,
    textAlign: 'center',
  },
  centerCol: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    fontSize: 16,
    color: Colors.text.muted,
  },
  scoreText: {
    fontSize: 20,
    color: Colors.primary.main,
  },
});

export default React.memo(MatchSchedule);
