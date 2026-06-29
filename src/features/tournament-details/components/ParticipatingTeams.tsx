import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ParticipatingTeam } from '../types';
import { Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { SectionContainer } from './LayoutContainers';

interface ParticipatingTeamsProps {
  teams: ParticipatingTeam[];
}

const TeamCard: React.FC<{ team: ParticipatingTeam }> = ({ team }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.8}>
    <View style={styles.logoWrapper}>
      <Image
        source={{ uri: team.logo }}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
    <Subheading style={styles.teamName} numberOfLines={1}>
      {team.name}
    </Subheading>
    <Label style={styles.captainText} numberOfLines={1}>
      Capt: {team.captain}
    </Label>
    <View style={styles.statsRow}>
      <Label style={styles.statLabel}>Rank {team.rank}</Label>
      <View style={styles.dot} />
      <Label style={styles.statLabel}>
        {team.wins}W - {team.losses}L
      </Label>
    </View>
  </TouchableOpacity>
);

const ParticipatingTeams: React.FC<ParticipatingTeamsProps> = ({ teams }) => (
  <SectionContainer
    title="Participating Teams"
    headerRight={
      <TouchableOpacity>
        <Label style={styles.viewAll}>View All</Label>
      </TouchableOpacity>
    }
  >
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {teams.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </ScrollView>
  </SectionContainer>
);

const styles = StyleSheet.create({
  viewAll: { color: Colors.primary.main, fontWeight: '600' },
  scrollContent: { gap: Spacing.md },
  card: {
    width: 130,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
  },
  logoWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.cardAlt,
    borderWidth: 2,
    borderColor: Colors.gaming.avatarRing,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  logo: { width: '100%', height: '100%' },
  teamName: { fontSize: 14, textAlign: 'center', marginBottom: 2 },
  captainText: {
    fontSize: 10,
    color: Colors.text.muted,
    marginBottom: Spacing.sm,
  },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statLabel: { fontSize: 10, color: Colors.text.secondary },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.text.muted,
  },
});

export default React.memo(ParticipatingTeams);
