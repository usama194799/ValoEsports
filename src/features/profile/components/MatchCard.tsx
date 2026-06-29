import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { MatchHistory } from '../types/profile';

interface MatchCardProps {
  match: MatchHistory;
  onPress?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onPress }) => {
  const isWin = match.result === 'Win';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, isWin ? styles.winBorder : styles.lossBorder]}
    >
      <View style={styles.header}>
        <View style={styles.gameInfo}>
          <Heading style={styles.gameName}>{match.game}</Heading>
          <Label style={styles.tournament}>{match.tournament}</Label>
        </View>
        <View
          style={[
            styles.resultBadge,
            isWin ? styles.winBadge : styles.lossBadge,
          ]}
        >
          <Label
            style={[
              styles.resultText,
              isWin ? styles.winText : styles.lossText,
            ]}
          >
            {match.result}
          </Label>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBlock}>
          <Label style={styles.statLabel}>K/D/A</Label>
          <Subheading style={styles.statValue}>
            {match.kills} / {match.deaths} / {match.assists}
          </Subheading>
        </View>

        {match.isMVP && (
          <View style={styles.mvpBadge}>
            <Icon name="star" size={12} color={Colors.warning.main} />
            <Label style={styles.mvpText}>MVP</Label>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Label style={styles.dateText}>
          {new Date(match.date).toLocaleDateString()}
        </Label>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
  },
  winBorder: {
    borderLeftColor: Colors.success.main,
  },
  lossBorder: {
    borderLeftColor: Colors.danger.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 16,
    marginBottom: 2,
  },
  tournament: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  resultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  winBadge: {
    backgroundColor: Colors.success.transparent.light,
  },
  lossBadge: {
    backgroundColor: Colors.danger.transparent.medium,
  },
  resultText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  winText: {
    color: Colors.success.main,
  },
  lossText: {
    color: Colors.danger.main,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  statValue: {
    fontSize: 14,
  },
  mvpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.warning.transparent.medium,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  mvpText: {
    fontSize: 10,
    color: Colors.warning.main,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dateText: {
    fontSize: 10,
    color: Colors.text.muted,
  },
});

export default React.memo(MatchCard);
