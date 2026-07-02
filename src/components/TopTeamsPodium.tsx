import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LeaderPlayer } from '../types';
import { Heading, Subheading, Label, Caption } from './Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Shadows } from '../theme/shadow';
import { Spacing } from '../theme/spacing';

interface TopTeamsPodiumProps {
  topPlayers: LeaderPlayer[];
  category: 'players' | 'teams';
  metric: 'ranking' | 'xp' | 'wins' | 'country';
}

const PodiumItem: React.FC<{
  player: LeaderPlayer;
  position: 'center' | 'left' | 'right';
  metric: 'ranking' | 'xp' | 'wins' | 'country';
}> = ({ player, position, metric }) => {
  const isCenter = position === 'center';
  const size = isCenter ? 96 : 72;
  const borderWidth = 2;

  let ringColor: string = Colors.gaming.rankGold;
  let nameColor: string = Colors.gaming.rankGold;

  if (position === 'left') {
    ringColor = Colors.leaderboard.rank2Bg; // Orange-ish
    nameColor = '#3A82F6'; // Blue-ish per Figma
  } else if (position === 'right') {
    ringColor = Colors.leaderboard.rank3Bg; // Blue-ish
    nameColor = '#F97316'; // Orange-ish per Figma
  }

  return (
    <View
      style={[
        styles.podiumItem,
        isCenter ? styles.podiumCenter : styles.podiumSide,
      ]}
    >
      <View style={styles.avatarWrapper}>
        <View
          style={[
            styles.ring,
            {
              width: size + borderWidth * 2,
              height: size + borderWidth * 2,
              borderRadius: (size + borderWidth * 2) / 2,
              borderColor: ringColor,
            },
          ]}
        >
          <Image
            source={{ uri: player.avatar }}
            style={[
              styles.avatar,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.rankBadge, { backgroundColor: ringColor }]}>
          <Label style={styles.rankBadgeText}>{player.rank}</Label>
        </View>
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.teamInfo}>
          <Heading style={[styles.teamName, { color: nameColor }]} numberOfLines={1}>
            {player.name}
          </Heading>
          <Caption style={styles.teamLabel} numberOfLines={1}>
            {player.label}
          </Caption>
        </View>
        <Caption style={styles.points}>
          {metric === 'xp'
            ? `${player.xp || player.points} XP`
            : metric === 'wins'
            ? `${player.wins || player.games} Wins`
            : metric === 'country'
            ? player.country || 'Global'
            : `${player.points} pts`}
        </Caption>
      </View>
    </View>
  );
};

const TopTeamsPodium: React.FC<TopTeamsPodiumProps> = ({ topPlayers, category, metric }) => {
  if (!topPlayers || topPlayers.length < 3) return null;

  // Assuming topPlayers is already sorted by rank 1, 2, 3
  const rank1 = topPlayers.find(p => p.rank === 1) || topPlayers[0];
  const rank2 = topPlayers.find(p => p.rank === 2) || topPlayers[1];
  const rank3 = topPlayers.find(p => p.rank === 3) || topPlayers[2];

  return (
    <View style={[styles.container, Shadows.cardHeavy]}>
      {/* Background waves/gradient could be an Image, using LinearGradient for now */}
      <LinearGradient
        colors={['#1E1E30', '#151525', '#10101A']}
        style={styles.gradientBg}
      />
      <Heading style={styles.title}>
        {category === 'players' ? 'Top Players' : 'Top Teams'}
      </Heading>

      <View style={styles.podiumRow}>
        <PodiumItem player={rank2} position="left" metric={metric} />
        <PodiumItem player={rank1} position="center" metric={metric} />
        <PodiumItem player={rank3} position="right" metric={metric} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    borderRadius: Radius.card,
    overflow: 'hidden',
    backgroundColor: Colors.dark.cardAlt,
    paddingVertical: Spacing.lg,
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
    fontSize: 18,
    letterSpacing: 0.5,
  },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    height: 160,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  podiumCenter: {
    zIndex: 10,
    transform: [{ translateY: -30 }], // Push up
  },
  podiumSide: {
    zIndex: 5,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  ring: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: Colors.dark.surface,
  },
  rankBadge: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.cardAlt,
  },
  rankBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000', // Figma shows dark text on badges
  },
  infoWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  teamInfo: {
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  teamName: {
    marginBottom: 2,
    textAlign: 'center',
    fontSize: 14,
  },
  teamLabel: {
    textAlign: 'center',
    fontSize: 11,
    color: Colors.neutral.whiteTransparent.max,
  },
  points: {
    color: Colors.text.muted,
  },
});

export default React.memo(TopTeamsPodium);
