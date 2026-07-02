import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Match } from '../types';
import { Heading, Subheading, Label } from './Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Spacing } from '../theme/spacing';

interface Props {
  match: Match;
}

const MatchListCard: React.FC<Props> = ({ match }) => {
  return (
    <View style={styles.card}>
      <Label style={styles.date}>{match.date} - {match.time}</Label>
      <View style={styles.row}>
        <Heading style={styles.team}>{match.teamA}</Heading>
        <Heading style={styles.score}>{match.scoreA ?? '-'}</Heading>
      </View>
      <View style={styles.vs}>
        <Label style={styles.vsText}>VS</Label>
      </View>
      <View style={styles.row}>
        <Heading style={styles.team}>{match.teamB}</Heading>
        <Heading style={styles.score}>{match.scoreB ?? '-'}</Heading>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    width: 250,
    marginRight: Spacing.md,
  },
  date: {
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  score: {
    fontSize: 18,
    color: Colors.primary.main,
  },
  vs: {
    alignItems: 'center',
    marginVertical: Spacing.xs,
  },
  vsText: {
    color: Colors.text.muted,
  },
});

export default MatchListCard;
