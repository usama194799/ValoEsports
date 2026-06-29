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
  interpolateColor,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LeaderPlayer, UserProfile} from '../types';
import {playerService, userService} from '../services';
import TopTeamsPodium from '../components/TopTeamsPodium';
import LeaderboardListRow from '../components/LeaderboardListRow';
import PlayerAvatar from '../components/PlayerAvatar';
import {Heading, Label} from '../components/Typography';
import {Colors} from '../theme/colors';
import {Spacing} from '../theme/spacing';

const LeaderboardScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderPlayer[]>([]);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scrollY = useSharedValue(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, leaderboardData] = await Promise.all([
          userService.getProfile(),
          playerService.getLeaderboard(),
        ]);
        setProfile(profileData);
        setLeaderboard(leaderboardData);
      } catch (e) {
        console.error('Failed to load leaderboard data:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      opacity.value = withDelay(100, withTiming(1, {duration: 500}));
      translateY.value = withDelay(100, withTiming(0, {duration: 500}));
    }
  }, [loading, opacity, translateY]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      scrollY.value,
      [0, 50],
      ['transparent', Colors.dark.background],
    );
    const elevation = interpolate(scrollY.value, [0, 50], [0, 8], Extrapolation.CLAMP);
    return {
      backgroundColor: bgColor,
      elevation,
      shadowOpacity: elevation > 0 ? 0.3 : 0,
    };
  });

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  const renderItem: ListRenderItem<LeaderPlayer> = useCallback(({item}) => (
    <LeaderboardListRow player={item} />
  ), []);

  if (loading || !profile) {
    return (
      <View style={styles.loadingRoot}>
        <ActivityIndicator size="large" color={Colors.primary.main} />
      </View>
    );
  }

  const top3 = leaderboard.slice(0, 3);
  const remainingPlayers = leaderboard.slice(0); // We display all in the list per Figma? Wait, Figma shows 1, 2, 3, 4 in the list.

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.dark.background}
        translucent={false}
      />

      {/* Sticky Header */}
      <Animated.View style={[styles.headerWrapper, {paddingTop: insets.top + Spacing.sm}, headerStyle]}>
        <View style={styles.headerContainer}>
          <PlayerAvatar
            uri={profile.avatar}
            size={40}
            borderWidth={2}
            borderColor="#3A82F6"
          />
          <Heading style={styles.headerTitle}>Leaderboard</Heading>
          <View style={styles.settingsBtn}>
            <Icon name="cog" size={22} color={Colors.text.primary} />
          </View>
        </View>
      </Animated.View>

      <Animated.FlatList
        data={remainingPlayers}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, {paddingTop: insets.top + 90}]}
        style={fadeStyle}
        ListHeaderComponent={
          <>
            <TopTeamsPodium topPlayers={top3} />
            {/* List Column Headers */}
            <View style={styles.listHeaders}>
              <Label style={styles.listHeaderLeft}>Rank</Label>
              <Label style={styles.listHeaderCenter}>Teams</Label>
              <Label style={styles.listHeaderRight}>M</Label>
              <Label style={styles.listHeaderFarRight}>Rating</Label>
            </View>
          </>
        }
        ListFooterComponent={<View style={styles.bottomSpacer} />}
      />
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
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    letterSpacing: 0.5,
  },
  settingsBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  listHeaders: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  listHeaderLeft: {
    width: 50,
  },
  listHeaderCenter: {
    flex: 1,
  },
  listHeaderRight: {
    width: 40,
    marginRight: Spacing.md,
    textAlign: 'center',
  },
  listHeaderFarRight: {
    width: 50,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default React.memo(LeaderboardScreen);
