import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LeaderPlayer } from '../types';
import { Heading, Subheading, Label, Caption } from './Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Shadows } from '../theme/shadow';
import { Spacing } from '../theme/spacing';

interface LeaderboardListRowProps {
  player: LeaderPlayer;
}

const getRankColors = (rank: number) => {
  switch (rank) {
    case 1:
      return { bg: Colors.leaderboard.rank1Bg, text: '#FFF' };
    case 2:
      return { bg: Colors.leaderboard.rank2Bg, text: '#FFF' };
    case 3:
      return { bg: Colors.leaderboard.rank3Bg, text: '#FFF' };
    default:
      return { bg: Colors.leaderboard.rank4Bg, text: '#FFF' };
  }
};

const LeaderboardListRow: React.FC<LeaderboardListRowProps> = ({ player }) => {
  const { bg: bgColor, text: textColor } = getRankColors(player.rank);

  const formattedPoints =
    player.points >= 1000
      ? `${(player.points / 1000).toFixed(1)}k`
      : `${player.points}`;

  return (
    <View style={[styles.row, { backgroundColor: bgColor }, Shadows.card]}>
      {/* Avatar & Badge */}
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: player.avatar }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.rankBadge}>
          <Label style={styles.rankBadgeText}>{player.rank}</Label>
        </View>
      </View>

      {/* Team Info */}
      <View style={styles.teamInfo}>
        <Subheading style={[styles.teamName, { color: textColor }]}>
          {player.teamName}
        </Subheading>
        <Caption
          style={[
            styles.teamLabel,
            { color: Colors.neutral.whiteTransparent.max },
          ]}
        >
          {player.teamLabel}
        </Caption>
      </View>

      {/* Matches */}
      <View style={styles.matchesCol}>
        <Heading style={[styles.matchesValue, { color: textColor }]}>
          {player.games}
        </Heading>
        <Label
          style={[
            styles.matchesLabel,
            { color: Colors.neutral.whiteTransparent.max },
          ]}
        >
          Match
        </Label>
      </View>

      {/* Rating */}
      <View style={styles.ratingCol}>
        <View style={styles.ratingBadge}>
          <Label style={[styles.ratingValue, { color: textColor }]}>
            {formattedPoints}
          </Label>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.card,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: Spacing.lg,
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
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000',
  },
  teamInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  teamName: {
    fontSize: 16,
    marginBottom: 2,
  },
  teamLabel: {
    fontSize: 12,
  },
  matchesCol: {
    alignItems: 'flex-start',
    marginRight: Spacing.xl,
    width: 40,
  },
  matchesValue: {
    fontSize: 16,
  },
  matchesLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  ratingCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.neutral.whiteTransparent.heavy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default React.memo(LeaderboardListRow);
