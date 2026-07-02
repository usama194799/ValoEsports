import React, { useEffect, useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Heading, Label, Subheading, Caption } from './Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Shadows } from '../theme/shadow';
import { Spacing } from '../theme/spacing';
import { LeaderPlayer } from '../types';

interface LeaderboardCardProps {
  item: LeaderPlayer;
  index: number;
}

const rankColors: Record<number, string> = {
  1: Colors.gaming.rankGold,
  2: Colors.gaming.rankSilver,
  3: Colors.gaming.rankBronze,
};

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ item, index }) => {
  const rankColor = rankColors[item.rank] ?? Colors.text.secondary;

  const formattedPoints =
    item.points >= 1000
      ? `${(item.points / 1000).toFixed(1)}k`
      : `${item.points}`;

  const imageSource = useMemo(() => ({ uri: item.avatar }), [item.avatar]);

  return (
    <View style={[styles.card, Shadows.card]}>
      {/* Avatar with rank badge */}
      <View style={styles.avatarContainer}>
        <Image source={imageSource} style={styles.avatar} resizeMode="cover" />
        <View style={[styles.rankBadge, { backgroundColor: rankColor }]}>
          <Label style={styles.rankText}>{item.rank}</Label>
        </View>
      </View>

      <View style={styles.teamInfo}>
        <Subheading style={styles.teamName}>{item.name}</Subheading>
        <Caption style={styles.teamLabel}>{item.label}</Caption>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statCol}>
          <Heading style={styles.statValue} color={Colors.primary.main}>
            {formattedPoints}
          </Heading>
          <Label style={styles.statLabel}>Points</Label>
        </View>
        <View style={styles.statCol}>
          <Heading style={styles.gamesValue}>{item.games}</Heading>
          <Label style={styles.statLabel}>Games</Label>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Radius.card,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    borderWidth: 0.5,
    borderColor: Colors.neutral.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.surface,
  },
  rankBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.dark.card,
  },
  rankText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.dark.card,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 14,
    marginBottom: 1,
  },
  teamLabel: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  stats: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  statCol: {
    alignItems: 'flex-end',
  },
  statValue: {
    fontSize: 14,
  },
  gamesValue: {
    fontSize: 14,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 1,
  },
});

export default React.memo(LeaderboardCard);
