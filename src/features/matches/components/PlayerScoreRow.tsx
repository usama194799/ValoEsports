import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Label } from '../../../components/Typography';

export interface PlayerStats {
  id: string;
  name: string;
  role: string;
  avatar: string;
  kills: number;
  deaths: number;
  assists: number;
  mvp: boolean;
}

interface PlayerScoreRowProps {
  player: PlayerStats;
}

const PlayerScoreRow: React.FC<PlayerScoreRowProps> = ({ player }) => {
  return (
    <View style={styles.container}>
      <View style={styles.playerInfo}>
        <Image source={{ uri: player.avatar }} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <View style={styles.nameRow}>
            <Label style={styles.nameText} numberOfLines={1}>
              {player.name}
            </Label>
            {player.mvp && (
              <View style={styles.mvpBadge}>
                <Icon name="star" size={10} color={Colors.gaming.rankGold} />
                <Label style={styles.mvpText}>MVP</Label>
              </View>
            )}
          </View>
          <Label style={styles.roleText}>{player.role}</Label>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Label style={styles.statValue}>{player.kills}</Label>
        </View>
        <View style={styles.statBox}>
          <Label style={[styles.statValue, { color: Colors.danger.main }]}>
            {player.deaths}
          </Label>
        </View>
        <View style={styles.statBox}>
          <Label style={styles.statValue}>{player.assists}</Label>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.background,
    marginRight: Spacing.sm,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: '600',
    marginRight: Spacing.xs,
  },
  mvpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning.transparent.light,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: Radius.xs,
    borderWidth: 1,
    borderColor: Colors.gaming.rankGold,
  },
  mvpText: {
    color: Colors.gaming.rankGold,
    fontSize: 8,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  roleText: {
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'flex-end',
  },
  statBox: {
    width: 30,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
});

export default PlayerScoreRow;
