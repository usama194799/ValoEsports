import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Team } from '../types/team';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';

interface TeamCardProps {
  team: Team;
  index: number;
  onPress: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, index, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={{ uri: team.logoUrl }} style={styles.logo} />
          <View style={styles.headerInfo}>
            <View style={styles.titleRow}>
              <Heading style={styles.teamName} numberOfLines={1}>
                {team.name}
              </Heading>
              {team.rank <= 3 && (
                <Icon
                  name="medal-outline"
                  size={16}
                  color={Colors.gaming.rankGold}
                />
              )}
            </View>
            <View style={styles.subtitleRow}>
              <Label style={styles.game}>{team.game}</Label>
              <View style={styles.dot} />
              <Icon name="account-group" size={14} color={Colors.text.muted} />
              <Label style={styles.members}>
                {team.membersCount}/{team.maxMembers}
              </Label>
            </View>
          </View>
          <View style={styles.rankBadge}>
            <Label style={styles.rankText}>#{team.rank}</Label>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Subheading style={styles.statValue}>{team.wins}</Subheading>
            <Label style={styles.statLabel}>Wins</Label>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Subheading style={styles.statValue}>{team.losses}</Subheading>
            <Label style={styles.statLabel}>Losses</Label>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Subheading
              style={[styles.statValue, { color: Colors.success.main }]}
            >
              {Math.round((team.wins / (team.wins + team.losses)) * 100)}%
            </Subheading>
            <Label style={styles.statLabel}>Win Rate</Label>
          </View>
        </View>

        {team.activeTournament && (
          <View style={styles.tournamentRow}>
            <Icon
              name="trophy-variant-outline"
              size={16}
              color={Colors.gaming.rankSilver}
            />
            <Label style={styles.activeTournament} numberOfLines={1}>
              {team.activeTournament}
            </Label>
          </View>
        )}

        <TouchableOpacity
          style={styles.detailsBtn}
          activeOpacity={0.8}
          onPress={onPress}
        >
          <Label style={styles.detailsText}>View Details</Label>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.dark.surface,
  },
  headerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  teamName: {
    fontSize: 18,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  game: {
    color: Colors.primary.main,
    fontSize: 12,
    fontWeight: '600',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.text.muted,
  },
  members: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  rankBadge: {
    backgroundColor: 'rgba(255,215,0,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  rankText: {
    color: Colors.gaming.rankGold,
    fontWeight: '700',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.neutral.border,
  },
  statValue: {
    fontSize: 16,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  tournamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  activeTournament: {
    flex: 1,
    color: Colors.text.secondary,
    fontSize: 12,
  },
  detailsBtn: {
    backgroundColor: Colors.primary.glow,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: {
    color: Colors.primary.main,
    fontWeight: '700',
  },
});

export default React.memo(TeamCard);
