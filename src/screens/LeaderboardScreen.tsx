import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LeaderPlayer, UserProfile } from '../types';
import { playerService, userService } from '../services';
import TopTeamsPodium from '../components/TopTeamsPodium';
import LeaderboardListRow from '../components/LeaderboardListRow';
import PlayerAvatar from '../components/PlayerAvatar';
import { Heading, Label, Subheading } from '../components/Typography';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Radius } from '../theme/radius';

type Category = 'players' | 'teams';
type Metric = 'ranking' | 'xp' | 'wins' | 'country';

const LeaderboardScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderPlayer[]>([]);
  
  const [category, setCategory] = useState<Category>('teams');
  const [metric, setMetric] = useState<Metric>('ranking');

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scrollY = useSharedValue(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileData, leaderboardData] = await Promise.all([
          userService.getProfile(),
          playerService.getLeaderboard({ category, metric }),
        ]);
        if (!profile) setProfile(profileData);
        setLeaderboard(leaderboardData);
      } catch (e) {
        console.error('Failed to load leaderboard data:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, metric]);

  useEffect(() => {
    if (!loading) {
      opacity.value = withDelay(100, withTiming(1, { duration: 500 }));
      translateY.value = withDelay(100, withTiming(0, { duration: 500 }));
    }
  }, [loading, opacity, translateY]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      scrollY.value,
      [0, 50],
      ['transparent', Colors.dark.background],
    );
    const elevation = interpolate(
      scrollY.value,
      [0, 50],
      [0, 8],
      Extrapolation.CLAMP,
    );
    return {
      backgroundColor: bgColor,
      elevation,
      shadowOpacity: elevation > 0 ? 0.3 : 0,
    };
  });

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const renderItem: ListRenderItem<LeaderPlayer> = useCallback(
    ({ item }) => <LeaderboardListRow player={item} metric={metric} />,
    [metric],
  );

  const top3 = leaderboard.slice(0, 3);
  const remainingPlayers = leaderboard.slice(0);

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <View style={styles.categoryToggle}>
        <TouchableOpacity
          style={[styles.categoryBtn, category === 'players' && styles.categoryBtnActive]}
          onPress={() => setCategory('players')}
        >
          <Label style={[styles.categoryBtnText, category === 'players' && styles.categoryBtnTextActive]}>Top Players</Label>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryBtn, category === 'teams' && styles.categoryBtnActive]}
          onPress={() => setCategory('teams')}
        >
          <Label style={[styles.categoryBtnText, category === 'teams' && styles.categoryBtnTextActive]}>Top Teams</Label>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll} contentContainerStyle={styles.metricsContent}>
        {(['ranking', 'xp', 'wins', 'country'] as Metric[]).map(m => (
          <TouchableOpacity
            key={m}
            style={[styles.metricChip, metric === m && styles.metricChipActive]}
            onPress={() => setMetric(m)}
          >
            <Label style={[styles.metricChipText, metric === m && styles.metricChipTextActive]}>
              {m === 'ranking' ? 'Ranking' : m === 'xp' ? 'XP' : m === 'wins' ? 'Wins' : 'Country Ranking'}
            </Label>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.dark.background}
        translucent={false}
      />

      <Animated.View
        style={[
          styles.headerWrapper,
          { paddingTop: insets.top + Spacing.sm },
          headerStyle,
        ]}
      >
        <View style={styles.headerContainer}>
          <PlayerAvatar
            uri={profile?.avatar || ''}
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
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 70 },
        ]}
        style={fadeStyle}
        ListHeaderComponent={
          <>
            {renderFilters()}
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary.main} />
              </View>
            ) : (
              <>
                <TopTeamsPodium topPlayers={top3} category={category} metric={metric} />
                <View style={styles.listHeaders}>
                  <Label style={styles.listHeaderLeft}>Rank</Label>
                  <Label style={styles.listHeaderCenter}>{category === 'players' ? 'Players' : 'Teams'}</Label>
                  <Label style={styles.listHeaderRight}>
                    {metric === 'xp' ? 'Lvl' : metric === 'wins' ? 'W' : 'M'}
                  </Label>
                  <Label style={styles.listHeaderFarRight}>
                    {metric === 'xp' ? 'XP' : metric === 'wins' ? 'Wins' : metric === 'country' ? 'Country' : 'Rating'}
                  </Label>
                </View>
              </>
            )}
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
  loadingContainer: {
    marginTop: Spacing.xxl,
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
  filtersContainer: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  categoryToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.full,
    padding: 4,
    marginBottom: Spacing.md,
  },
  categoryBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: Radius.full,
  },
  categoryBtnActive: {
    backgroundColor: Colors.primary.main,
  },
  categoryBtnText: {
    color: Colors.text.secondary,
    fontWeight: '600',
  },
  categoryBtnTextActive: {
    color: '#FFF',
  },
  metricsScroll: {
    flexGrow: 0,
  },
  metricsContent: {
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  metricChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.dark.cardAlt,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  metricChipActive: {
    borderColor: Colors.primary.main,
    backgroundColor: Colors.primary.main + '20',
  },
  metricChipText: {
    color: Colors.text.secondary,
  },
  metricChipTextActive: {
    color: Colors.primary.main,
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
    width: 70,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default React.memo(LeaderboardScreen);
