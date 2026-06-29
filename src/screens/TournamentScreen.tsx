import React, { useCallback, useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import {
  RefreshControl,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ROUTES } from '../navigation/routes';
import { Tournament } from '../types';
import { playerService } from '../services'; // We will just use playerService or a mocked fetch for tournaments
import { db } from '../data/db'; // Direct access for mock
import SearchHeader from '../components/SearchHeader';
import CategoryChips from '../components/CategoryChips';
import TournamentListCard from '../components/TournamentListCard';
import TournamentFiltersSheet from '../components/TournamentFiltersSheet';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import NoInternetState from '../components/NoInternetState';
import { Heading, Label } from '../components/Typography';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';

const CATEGORIES = [
  'All',
  'Valorant',
  'PUBG',
  'BGMI',
  'COD',
  'Free Fire',
  'CS2',
];
const SORT_OPTIONS = [
  'Newest',
  'Popular',
  'Highest Prize',
  'Closing Soon',
  'Free Entry',
  'Premium',
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TournamentScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Newest');

  const [filterVisible, setFilterVisible] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const fetchTournaments = useCallback(
    async (isRefresh = false) => {
      try {
        if (!isRefresh) setLoading(true);
        setNetworkError(false);

        // Simulate API call
        await new Promise<void>(resolve => setTimeout(resolve, 1000));

        let data = [...db.tournaments];

        // Category Filter
        if (category !== 'All') {
          data = data.filter(t =>
            t.gameName.toLowerCase().includes(category.toLowerCase()),
          );
        }

        setTournaments(data);
      } catch (e) {
        setNetworkError(true);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [category],
  );

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTournaments(true);
  }, [fetchTournaments]);

  const handleSearchPress = useCallback(() => {
    navigation.navigate(ROUTES.SEARCH);
  }, [navigation]);

  const renderItem = useCallback(
    ({ item, index }: { item: Tournament; index: number }) => {
      return (
        <TournamentListCard
          item={item}
          index={index}
          onPress={() =>
            navigation.navigate(ROUTES.TOURNAMENT_DETAILS, {
              tournamentId: item.id,
            })
          }
        />
      );
    },
    [navigation],
  );

  const renderEmpty = useCallback(() => {
    if (loading) return null;
    if (networkError)
      return <NoInternetState onRetry={() => fetchTournaments()} />;
    return (
      <EmptyState
        title="No Tournaments Found"
        message="Try adjusting your filters or search criteria."
      />
    );
  }, [loading, networkError, fetchTournaments]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <SearchHeader
        editable={false}
        onPress={handleSearchPress}
        onVoicePress={handleSearchPress}
      />

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <CategoryChips
          categories={CATEGORIES}
          selectedCategory={category}
          onSelect={setCategory}
        />
      </View>

      {/* Sort & Filter Bar */}
      <View style={styles.sortBar}>
        <TouchableOpacity style={styles.sortBtn}>
          <Label style={styles.sortLabel}>Sort: {sort}</Label>
          <Icon name="chevron-down" size={16} color={Colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterVisible(true)}
          style={styles.filterBtn}
        >
          <Icon name="tune-variant" size={18} color={Colors.text.primary} />
          <Label style={styles.filterLabel}>Filters</Label>
        </TouchableOpacity>
      </View>

      {loading && !refreshing ? (
        <View style={styles.listContent}>
          <SkeletonCard index={0} />
          <SkeletonCard index={1} />
          <SkeletonCard index={2} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlashList
            data={tournaments}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmpty}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primary.main}
                colors={[Colors.primary.main]}
              />
            }
            estimatedItemSize={250}
          />
        </View>
      )}

      {/* Filter Bottom Sheet */}
      <TournamentFiltersSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={() => {
          setFilterVisible(false);
          fetchTournaments();
        }}
        onReset={() => {
          setFilterVisible(false);
          fetchTournaments();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  categoriesWrapper: {
    paddingVertical: Spacing.xs,
  },
  sortBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.borderLight,
    marginBottom: Spacing.sm,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortLabel: {
    fontWeight: '600',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.dark.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterLabel: {
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100, // accommodate bottom tab
  },
});

export default React.memo(TournamentScreen);
