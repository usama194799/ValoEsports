import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {ROUTES} from '../navigation/routes';
import {BottomTabScreenPropsType} from '../navigation/types';

import {
  Tournament,
  LeaderPlayer,
  UserProfile,
  HeroBannerData,
} from '../types';

import {
  tournamentService,
  playerService,
  userService,
} from '../services';

import DashboardHeader from '../components/DashboardHeader';
import HeroBanner from '../components/HeroBanner';
import SectionHeader from '../components/SectionHeader';
import TournamentCard from '../components/TournamentCard';
import UpcomingCard from '../components/UpcomingCard';
import LeaderboardCard from '../components/LeaderboardCard';

import {Colors} from '../theme/colors';
import {Spacing} from '../theme/spacing';
import {wp} from '../utils/responsive';

type Props = BottomTabScreenPropsType<typeof ROUTES.HOME_TAB>;

const tournamentKeyExtractor = (item: Tournament) => item.id;
const CARD_LAYOUT_WIDTH = wp(178) + Spacing.md; // CARD_WIDTH + marginRight

const DashboardScreen: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  
  // Data State
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hero, setHero] = useState<HeroBannerData | null>(null);
  const [ongoing, setOngoing] = useState<Tournament[]>([]);
  const [upcoming, setUpcoming] = useState<Tournament[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderPlayer[]>([]);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scrollY = useSharedValue(0);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileData,
          heroData,
          ongoingData,
          upcomingData,
          leaderboardData,
        ] = await Promise.all([
          userService.getProfile(),
          userService.getHeroBanner(),
          tournamentService.getOngoingTournaments(),
          tournamentService.getUpcomingTournaments(),
          playerService.getLeaderboard(),
        ]);

        setProfile(profileData);
        setHero(heroData);
        setOngoing(ongoingData);
        setUpcoming(upcomingData);
        setLeaderboard(leaderboardData);
      } catch (e) {
        console.error('Failed to load dashboard data:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!loading) {
        opacity.value = withDelay(100, withTiming(1, {duration: 500}));
        translateY.value = withDelay(100, withTiming(0, {duration: 500}));
      }
      return () => {
        opacity.value = 0;
        translateY.value = 20;
      };
    }, [opacity, translateY, loading]),
  );

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleSettingsPress = useCallback(() => {
    navigation.navigate(ROUTES.SETTINGS);
  }, [navigation]);

  const handleTournamentPress = useCallback(
    (id: string) => {
      navigation.navigate(ROUTES.TOURNAMENT_DETAILS, {tournamentId: id});
    },
    [navigation],
  );

  const renderTournamentCard: ListRenderItem<Tournament> = useCallback(
    ({item, index}) => (
      <TournamentCard item={item} index={index} onPress={() => handleTournamentPress(item.id)} />
    ),
    [handleTournamentPress]
  );

  const renderUpcomingCard: ListRenderItem<Tournament> = useCallback(
    ({item, index}) => (
      <UpcomingCard item={item} index={index} onPress={() => handleTournamentPress(item.id)} />
    ),
    [handleTournamentPress]
  );

  const renderLeaderboardCards = useMemo(() => {
    return leaderboard.map((player, index) => (
      <LeaderboardCard key={player.id} item={player} index={index} />
    ));
  }, [leaderboard]);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: CARD_LAYOUT_WIDTH,
    offset: CARD_LAYOUT_WIDTH * index,
    index,
  }), []);

  if (loading || !profile || !hero) {
    return (
      <View style={styles.loadingRoot}>
        <ActivityIndicator size="large" color={Colors.primary.main} />
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
        username={profile.username}
        role={profile.role}
        avatarUri={profile.avatar}
        onSettingsPress={handleSettingsPress}
        scrollY={scrollY}
      />

      <Animated.ScrollView
        style={[styles.scrollView, fadeStyle]}
        contentContainerStyle={[styles.scrollContent, {paddingTop: insets.top + 90}]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        onScroll={scrollHandler}
        scrollEventThrottle={16}>

        <HeroBanner
          gameName={hero.gameName}
          tournamentName={hero.tournamentName}
          date={hero.date}
          time={hero.time}
          image={hero.image}
          scrollY={scrollY}
        />

        <View style={styles.section}>
          <SectionHeader
            title="Ongoing Tournaments"
            onSeeAll={() => navigation.navigate(ROUTES.TOURNAMENTS_TAB)}
          />
          <FlatList
            data={ongoing}
            renderItem={renderTournamentCard}
            keyExtractor={tournamentKeyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            scrollEventThrottle={16}
            removeClippedSubviews={true}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            windowSize={5}
            getItemLayout={getItemLayout}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Up Coming Tournaments"
            onSeeAll={() => navigation.navigate(ROUTES.TOURNAMENTS_TAB)}
          />
          <FlatList
            data={upcoming}
            renderItem={renderUpcomingCard}
            keyExtractor={tournamentKeyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            scrollEventThrottle={16}
            removeClippedSubviews={true}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            windowSize={5}
            getItemLayout={getItemLayout}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Top players"
            onSeeAll={() => navigation.navigate(ROUTES.LEADERBOARD_TAB)}
          />
          <View style={styles.leaderboardList}>
            {renderLeaderboardCards}
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
  },
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
