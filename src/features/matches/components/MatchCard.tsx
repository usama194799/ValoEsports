import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

export interface MatchTeam {
  id: string;
  name: string;
  tag: string;
  logoUrl: string;
}

export interface MatchData {
  id: string;
  tournamentName: string;
  tournamentBanner: string;
  matchNumber: string;
  round: string;
  bestOf: string;
  teamA: MatchTeam;
  teamB: MatchTeam;
  matchTime: string;
  countdown: string;
  status: 'upcoming' | 'live' | 'completed';
  scoreA: number;
  scoreB: number;
  winnerId?: string;
}

interface MatchCardProps {
  match: MatchData;
  onPress?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onPress }) => {
  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.bannerContainer}>
        <Image source={{ uri: match.tournamentBanner }} style={styles.banner} />
        <View style={styles.bannerOverlay} />
        <View style={styles.bannerContent}>
          <Heading style={styles.tournamentName}>
            {match.tournamentName}
          </Heading>
          <Label style={styles.matchMeta}>
            {match.round} • {match.bestOf} • {match.matchNumber}
          </Label>
        </View>
        {isLive && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Label style={styles.liveText}>LIVE</Label>
          </View>
        )}
      </View>

      <View style={styles.matchupContainer}>
        <View style={styles.teamContainer}>
          <Image
            source={{ uri: match.teamA.logoUrl }}
            style={styles.teamLogo}
          />
          <Heading style={styles.teamTag}>{match.teamA.tag}</Heading>
        </View>

        <View style={styles.scoreContainer}>
          {isCompleted || isLive ? (
            <View style={styles.scoreBox}>
              <Heading
                style={[
                  styles.scoreText,
                  match.scoreA > match.scoreB && styles.scoreWinner,
                ]}
              >
                {match.scoreA}
              </Heading>
              <Heading style={styles.scoreDivider}>-</Heading>
              <Heading
                style={[
                  styles.scoreText,
                  match.scoreB > match.scoreA && styles.scoreWinner,
                ]}
              >
                {match.scoreB}
              </Heading>
            </View>
          ) : (
            <Heading style={styles.vsText}>VS</Heading>
          )}
          <Label style={styles.timeText}>{match.matchTime}</Label>
          {match.countdown ? (
            <Label style={styles.countdownText}>{match.countdown}</Label>
          ) : null}
        </View>

        <View style={styles.teamContainer}>
          <Image
            source={{ uri: match.teamB.logoUrl }}
            style={styles.teamLogo}
          />
          <Heading style={styles.teamTag}>{match.teamB.tag}</Heading>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    marginBottom: Spacing.md,
  },
  bannerContainer: {
    height: 80,
    width: '100%',
    position: 'relative',
  },
  banner: {
    ...(StyleSheet.absoluteFill as any),
  },
  bannerOverlay: {
    ...(StyleSheet.absoluteFill as any),
    backgroundColor: Colors.neutral.blackTransparent.medium,
  },
  bannerContent: {
    padding: Spacing.md,
    justifyContent: 'center',
    flex: 1,
  },
  tournamentName: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  matchMeta: {
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 2,
  },
  liveBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.danger.transparent.dark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.danger.main,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.danger.main,
    marginRight: 4,
  },
  liveText: {
    color: Colors.danger.main,
    fontSize: 10,
    fontWeight: 'bold',
  },
  matchupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark.background,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  teamTag: {
    fontSize: 14,
    marginTop: Spacing.sm,
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
  },
  vsText: {
    fontSize: 18,
    color: Colors.text.muted,
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    color: Colors.text.secondary,
  },
  scoreDivider: {
    fontSize: 20,
    color: Colors.text.muted,
    marginHorizontal: Spacing.sm,
  },
  scoreWinner: {
    color: Colors.primary.main,
  },
  timeText: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  countdownText: {
    fontSize: 11,
    color: Colors.primary.main,
    marginTop: 2,
  },
});

export default MatchCard;
