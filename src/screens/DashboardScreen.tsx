import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { ROUTES } from '../navigation/routes';
import { BottomTabScreenPropsType } from '../navigation/types';

import {
  Tournament,
  LeaderPlayer,
  UserProfile,
  HeroBannerData,
  Match,
} from '../types';

import { tournamentService, playerService, userService, matchService } from '../services';

import DashboardHeader from '../components/DashboardHeader';
import HeroBanner from '../components/HeroBanner';
import SectionHeader from '../components/SectionHeader';
import TournamentCard from '../components/TournamentCard';
import UpcomingCard from '../components/UpcomingCard';
import LeaderboardCard from '../components/LeaderboardCard';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import NoInternetState from '../components/NoInternetState';
import MatchListCard from '../components/MatchListCard';
import StatCard from '../components/StatCard';
import AnnouncementCard from '../components/AnnouncementCard';

import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { wp } from '../utils/responsive';

type Props = BottomTabScreenPropsType<typeof ROUTES.HOME_TAB>;

const tournamentKeyExtractor = (item: Tournament) => item.id;
const CARD_LAYOUT_WIDTH = wp(178) + Spacing.md; // CARD_WIDTH + marginRight

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Data State
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hero, setHero] = useState<HeroBannerData | null>(null);
  const [ongoing, setOngoing] = useState<Tournament[]>([]);
  const [upcoming, setUpcoming] = useState<Tournament[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderPlayer[]>([]);
  
  // New State
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scrollY = useSharedValue(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setNetworkError(false);
      const results = await Promise.allSettled([
        userService.getProfile(),
        userService.getHeroBanner(),
        tournamentService.getOngoingTournaments(),
        tournamentService.getUpcomingTournaments(),
        playerService.getLeaderboard(),
        matchService.getRecentMatches(),
        userService.getStatistics(),
        userService.getAnnouncements(),
      ]);

      setProfile(results[0].status === 'fulfilled' ? results[0].value : null);
      setHero(results[1].status === 'fulfilled' ? results[1].value : null);
      setOngoing(results[2].status === 'fulfilled' ? results[2].value : []);
      setUpcoming(results[3].status === 'fulfilled' ? results[3].value : []);
      setLeaderboard(results[4].status === 'fulfilled' ? results[4].value : []);
      setRecentMatches(results[5].status === 'fulfilled' ? results[5].value : []);
      setStatistics(results[6].status === 'fulfilled' ? results[6].value : null);
      setAnnouncements(results[7].status === 'fulfilled' ? results[7].value : []);

    } catch (e) {
      console.error('Failed to load dashboard data:', e);
      setNetworkError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useFocusEffect(
    useCallback(() => {
      if (!loading && !networkError) {
        opacity.value = withDelay(100, withTiming(1, { duration: 500 }));
        translateY.value = withDelay(100, withTiming(0, { duration: 500 }));
      }
      return () => {
        opacity.value = 0;
        translateY.value = 20;
      };
    }, [opacity, translateY, loading, networkError]),
  );

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleSettingsPress = useCallback(() => {
    navigation.navigate(ROUTES.SETTINGS);
  }, [navigation]);

  const handleTournamentPress = useCallback(
    (id: string) => {
      navigation.navigate(ROUTES.TOURNAMENT_DETAILS, { tournamentId: id });
    },
    [navigation],
  );

  const renderTournamentCard: ListRenderItem<Tournament> = useCallback(
    ({ item, index }) => (
      <TournamentCard
        item={item}
        index={index}
        onPress={() => handleTournamentPress(item.id)}
      />
    ),
    [handleTournamentPress],
  );

  const renderUpcomingCard: ListRenderItem<Tournament> = useCallback(
    ({ item, index }) => (
      <UpcomingCard
        item={item}
        index={index}
        onPress={() => handleTournamentPress(item.id)}
      />
    ),
    [handleTournamentPress],
  );

  if (networkError) {
    return (
      <View style={styles.loadingRoot}>
        <NoInternetState onRetry={fetchData} />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.dark.background}
          translucent={false}
        />
        <View style={styles.skeletonContainer}>
          <View style={{ height: 60, marginBottom: 20, backgroundColor: Colors.dark.card, borderRadius: 12 }} />
          <SkeletonCard />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <SkeletonCard />
            <SkeletonCard />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.dark.background}
        translucent={false}
      />

      <DashboardHeader
        username={profile?.username || 'Player'}
        role={profile?.role || 'member'}
        avatarUri={profile?.avatar || 'https://via.placeholder.com/150'}
        onSettingsPress={handleSettingsPress}
        scrollY={scrollY}
      />

      <Animated.ScrollView
        style={[styles.scrollView, fadeStyle]}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 90 },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchData}
            tintColor={Colors.primary.main}
          />
        }
      >
        {hero && (
          <HeroBanner
            gameName={hero.gameName}
            tournamentName={hero.tournamentName}
            date={hero.date}
            time={hero.time}
            image={hero.image}
            scrollY={scrollY}
          />
        )}

        <View style={styles.section}>
          <SectionHeader
            title="Ongoing Tournaments"
            onSeeAll={() => navigation.navigate(ROUTES.TOURNAMENTS_TAB)}
          />
          <FlashList
            data={ongoing}
            renderItem={renderTournamentCard}
            keyExtractor={tournamentKeyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            estimatedItemSize={CARD_LAYOUT_WIDTH}
            ListEmptyComponent={<EmptyState title="No Tournaments" message="No ongoing tournaments" />}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Up Coming Tournaments"
            onSeeAll={() => navigation.navigate(ROUTES.TOURNAMENTS_TAB)}
          />
          <FlashList
            data={upcoming}
            renderItem={renderUpcomingCard}
            keyExtractor={tournamentKeyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            estimatedItemSize={CARD_LAYOUT_WIDTH}
            ListEmptyComponent={<EmptyState title="No Tournaments" message="No upcoming tournaments" />}
          />
        </View>

        {recentMatches && recentMatches.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="Recent Matches"
              onSeeAll={() => {}}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
              {recentMatches.map((m) => (
                <MatchListCard key={m.id} match={m} />
              ))}
            </ScrollView>
          </View>
        )}

        {statistics && (
          <View style={styles.section}>
            <SectionHeader
              title="Your Statistics"
            />
            <View style={[styles.horizontalList, { flexDirection: 'row' }]}>
              <StatCard title="Points" value={statistics.totalPoints || profile?.totalPoints || 0} />
              <StatCard title="Matches" value={statistics.matchesPlayed || profile?.matchesPlayed || 0} />
              <StatCard title="Wins" value={statistics.tournamentsWon || profile?.tournamentsWon || 0} />
            </View>
          </View>
        )}

        {announcements && announcements.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="Announcements"
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
              {announcements.map((a, idx) => (
                <AnnouncementCard key={idx} title={a.title} message={a.message} date={a.date || ''} />
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader
            title="Top players"
            onSeeAll={() => navigation.navigate(ROUTES.LEADERBOARD_TAB)}
          />
          {leaderboard.length > 0 ? (
            <View style={styles.leaderboardList}>
              {leaderboard.map((player, index) => (
                <LeaderboardCard key={player.id} item={player} index={index} />
              ))}
            </View>
          ) : (
            <EmptyState title="No Players" message="Leaderboard is empty" />
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  loadingRoot: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonContainer: {
    flex: 1,
    padding: Spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {},
  section: {
    marginTop: Spacing.xxl,
  },
  horizontalList: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.md,
  },
  leaderboardList: {
    gap: 0,
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
});

export default React.memo(DashboardScreen);
