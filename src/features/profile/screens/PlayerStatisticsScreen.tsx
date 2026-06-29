import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Heading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { useProfileData } from '../hooks/useProfileData';
import StatCard from '../components/StatCard';

const PlayerStatisticsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { profile } = useProfileData();

  if (!profile) return null;

  const { statistics } = profile;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Player Statistics</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.row}>
          <StatCard
            label="Matches Played"
            value={statistics.matchesPlayed}
            delay={100}
          />
          <StatCard
            label="Win Rate"
            value={statistics.winRate}
            highlight
            delay={200}
          />
        </View>

        <View style={styles.row}>
          <StatCard label="Wins" value={statistics.wins} delay={300} />
          <StatCard label="Losses" value={statistics.losses} delay={400} />
        </View>

        <View style={styles.row}>
          <StatCard
            label="K/D/A Ratio"
            value={statistics.kda}
            highlight
            delay={500}
          />
          <StatCard
            label="Headshot %"
            value={statistics.headshotPercentage}
            delay={600}
          />
        </View>

        <View style={styles.row}>
          <StatCard
            label="MVP Awards"
            value={statistics.mvpAwards}
            delay={700}
          />
          <StatCard
            label="Tourney Wins"
            value={statistics.tournamentWins}
            highlight
            delay={800}
          />
        </View>

        <View style={styles.row}>
          <StatCard
            label="Current Rank"
            value={profile.currentRank}
            delay={900}
          />
          <StatCard
            label="Highest Rank"
            value={profile.highestRank}
            delay={1000}
          />
        </View>

        <View style={styles.singleRow}>
          <StatCard
            label="Total Prize Money"
            value={statistics.prizeMoney}
            highlight
            delay={1100}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  backBtn: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl * 2,
    gap: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  singleRow: {
    flexDirection: 'row',
  },
});

export default PlayerStatisticsScreen;
