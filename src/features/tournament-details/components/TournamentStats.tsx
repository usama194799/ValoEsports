import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TournamentStats as StatsType } from '../types';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { SectionContainer } from './LayoutContainers';

interface TournamentStatsProps {
  stats: StatsType;
}

const StatBox: React.FC<{
  icon: string;
  label: string;
  value: number | string;
}> = ({ icon, label, value }) => (
  <View style={styles.statBox}>
    <View style={styles.iconWrapper}>
      <Icon name={icon} size={20} color={Colors.primary.main} />
    </View>
    <View style={styles.statText}>
      <Subheading style={styles.value}>{value}</Subheading>
      <Label style={styles.label}>{label}</Label>
    </View>
  </View>
);

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const TournamentStats: React.FC<TournamentStatsProps> = ({ stats }) => (
  <SectionContainer title="Tournament Stats">
    <View style={styles.grid}>
      <StatBox
        icon="account-group"
        label="Total Teams"
        value={stats.totalTeams}
      />
      <StatBox
        icon="account-multiple"
        label="Players"
        value={stats.registeredPlayers}
      />
      <StatBox
        icon="sword-cross"
        label="Matches Played"
        value={stats.completedMatches}
      />
      <StatBox
        icon="calendar-clock"
        label="Remaining"
        value={stats.remainingMatches}
      />
      <StatBox
        icon="eye"
        label="Spectators"
        value={formatNumber(stats.spectators)}
      />
      <StatBox
        icon="video-outline"
        label="Total Views"
        value={formatNumber(stats.views)}
      />
    </View>
  </SectionContainer>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statBox: {
    width: '47%', // roughly half minus gap
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary.transparent.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  statText: {
    flex: 1,
  },
  value: {
    fontSize: 16,
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    color: Colors.text.muted,
  },
});

export default React.memo(TournamentStats);
