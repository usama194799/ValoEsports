import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  RootStackScreenProps,
  RootStackParamList,
} from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label } from '../../../components/Typography';

import LiveScoreboard from '../components/LiveScoreboard';
import PlayerScoreRow from '../components/PlayerScoreRow';
import { MOCK_MATCHES, MOCK_LIVE_STATS } from '../constants/mockData';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.LIVE_MATCH
>['navigation'];
type ScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.LIVE_MATCH>;

const LiveMatchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { matchId } = route.params;

  const match = MOCK_MATCHES.find(m => m.id === matchId) || MOCK_MATCHES[1];
  const stats = MOCK_LIVE_STATS;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-down" size={28} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Live Match</Heading>
        <TouchableOpacity style={styles.shareBtn}>
          <Icon name="share-variant" size={22} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LiveScoreboard
          teamA={match.teamA}
          teamB={match.teamB}
          scoreA={match.scoreA}
          scoreB={match.scoreB}
          mapName={stats.mapName}
          elapsedTime={stats.elapsedTime}
          spectatorCount={stats.spectatorCount}
        />

        <View style={styles.playersSection}>
          <View style={styles.tableHeader}>
            <Heading style={styles.teamHeaderName}>{match.teamA.tag}</Heading>
            <View style={styles.statsHeader}>
              <Label style={styles.headerLabel}>K</Label>
              <Label style={styles.headerLabel}>D</Label>
              <Label style={styles.headerLabel}>A</Label>
            </View>
          </View>
          <View style={styles.tableBody}>
            {stats.playersA.map(player => (
              <PlayerScoreRow key={player.id} player={player} />
            ))}
          </View>
        </View>

        <View style={styles.playersSection}>
          <View style={styles.tableHeader}>
            <Heading style={styles.teamHeaderName}>{match.teamB.tag}</Heading>
            <View style={styles.statsHeader}>
              <Label style={styles.headerLabel}>K</Label>
              <Label style={styles.headerLabel}>D</Label>
              <Label style={styles.headerLabel}>A</Label>
            </View>
          </View>
          <View style={styles.tableBody}>
            {stats.playersB.map(player => (
              <PlayerScoreRow key={player.id} player={player} />
            ))}
          </View>
        </View>

        <View style={styles.timelineSection}>
          <Heading style={styles.sectionTitle}>Round Timeline</Heading>
          <View style={styles.timelinePlaceholder}>
            <Icon
              name="timeline-text-outline"
              size={32}
              color={Colors.text.muted}
            />
            <Label style={styles.timelineText}>Timeline data syncing...</Label>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.dark.background,
  },
  backBtn: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
  },
  shareBtn: {
    padding: Spacing.sm,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  playersSection: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.dark.cardAlt,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.border,
  },
  teamHeaderName: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  statsHeader: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'flex-end',
  },
  headerLabel: {
    width: 30,
    textAlign: 'center',
    color: Colors.text.muted,
    fontSize: 11,
    fontWeight: 'bold',
  },
  tableBody: {
    backgroundColor: Colors.dark.surface,
  },
  timelineSection: {
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  timelinePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    borderStyle: 'dashed',
  },
  timelineText: {
    marginTop: Spacing.md,
    color: Colors.text.muted,
  },
});

export default LiveMatchScreen;
