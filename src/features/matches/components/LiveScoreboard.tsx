import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label } from '../../../components/Typography';
import { MatchTeam } from './MatchCard';

interface LiveScoreboardProps {
  teamA: MatchTeam;
  teamB: MatchTeam;
  scoreA: number;
  scoreB: number;
  mapName: string;
  elapsedTime: string;
  spectatorCount: number;
}

const LiveScoreboard: React.FC<LiveScoreboardProps> = ({
  teamA,
  teamB,
  scoreA,
  scoreB,
  mapName,
  elapsedTime,
  spectatorCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.mapInfo}>
          <Icon name="map-outline" size={16} color={Colors.text.muted} />
          <Label style={styles.mapText}>Map: {mapName}</Label>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Label style={styles.liveText}>LIVE</Label>
        </View>
      </View>

      <View style={styles.scoreRow}>
        <View style={styles.teamSection}>
          <Image source={{ uri: teamA.logoUrl }} style={styles.logo} />
          <Heading style={styles.teamTag}>{teamA.tag}</Heading>
        </View>

        <View style={styles.centerSection}>
          <Heading style={styles.scoreText}>
            {scoreA} - {scoreB}
          </Heading>
          <Label style={styles.timeText}>{elapsedTime}</Label>
        </View>

        <View style={styles.teamSection}>
          <Image source={{ uri: teamB.logoUrl }} style={styles.logo} />
          <Heading style={styles.teamTag}>{teamB.tag}</Heading>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.spectatorsInfo}>
          <Icon name="eye-outline" size={14} color={Colors.text.muted} />
          <Label style={styles.spectatorsText}>
            {spectatorCount.toLocaleString()} watching
          </Label>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  mapInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapText: {
    marginLeft: Spacing.xs,
    color: Colors.text.secondary,
    fontSize: 12,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.danger.transparent.dark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
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
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dark.background,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  teamTag: {
    fontSize: 16,
    marginTop: Spacing.sm,
  },
  centerSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  scoreText: {
    fontSize: 32,
    letterSpacing: 2,
    color: Colors.text.primary,
  },
  timeText: {
    color: Colors.primary.main,
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.borderLight,
    alignItems: 'center',
  },
  spectatorsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spectatorsText: {
    marginLeft: Spacing.xs,
    fontSize: 12,
    color: Colors.text.muted,
  },
});

export default LiveScoreboard;
