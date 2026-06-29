import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label } from '../../../components/Typography';

interface BracketTeam {
  id?: string;
  tag: string;
}

export interface BracketMatch {
  id: string;
  round: string;
  matchId: string;
  teamA: BracketTeam | null;
  teamB: BracketTeam | null;
  scoreA: number;
  scoreB: number;
  status: 'upcoming' | 'live' | 'completed';
}

interface BracketNodeProps {
  match: BracketMatch;
  onPress?: () => void;
  isLast?: boolean;
}

const BracketNode: React.FC<BracketNodeProps> = ({
  match,
  onPress,
  isLast,
}) => {
  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';

  const teamAWins = match.scoreA > match.scoreB;
  const teamBWins = match.scoreB > match.scoreA;

  const renderTeam = (
    team: BracketTeam | null,
    score: number,
    isWinner: boolean,
  ) => {
    return (
      <View style={[styles.teamRow, isWinner && styles.winnerRow]}>
        <Label style={[styles.teamName, isWinner && styles.winnerText]}>
          {team ? team.tag : 'TBD'}
        </Label>
        <Label style={[styles.score, isWinner && styles.winnerText]}>
          {(isCompleted || isLive) && team ? score : '-'}
        </Label>
      </View>
    );
  };

  return (
    <View style={styles.nodeContainer}>
      <TouchableOpacity
        style={[styles.nodeBox, isLive && styles.liveBox]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={styles.nodeHeader}>
          <Label style={styles.matchNumber}>{match.round}</Label>
          {isLive && <Label style={styles.liveLabel}>LIVE</Label>}
        </View>
        <View style={styles.teamsContainer}>
          {renderTeam(match.teamA, match.scoreA, isCompleted && teamAWins)}
          <View style={styles.divider} />
          {renderTeam(match.teamB, match.scoreB, isCompleted && teamBWins)}
        </View>
      </TouchableOpacity>
      {!isLast && (
        <View style={styles.connectorContainer}>
          <View style={styles.connectorLine} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  nodeBox: {
    width: 160,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    overflow: 'hidden',
  },
  liveBox: {
    borderColor: Colors.primary.main,
  },
  nodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.cardAlt,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  matchNumber: {
    fontSize: 10,
    color: Colors.text.muted,
  },
  liveLabel: {
    fontSize: 10,
    color: Colors.primary.main,
    fontWeight: 'bold',
  },
  teamsContainer: {
    paddingVertical: 4,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  winnerRow: {
    backgroundColor: Colors.neutral.whiteTransparent.light,
  },
  teamName: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  score: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontWeight: '600',
  },
  winnerText: {
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.borderLight,
  },
  connectorContainer: {
    width: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  connectorLine: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.neutral.border,
  },
});

export default BracketNode;
