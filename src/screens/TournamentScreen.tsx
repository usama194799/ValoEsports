import React, { useCallback, useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import {
  RefreshControl,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ROUTES } from '../navigation/routes';
import { Tournament } from '../types';
import { tournamentService } from '../services';

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
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Newest');

  const [filterVisible, setFilterVisible] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const fetchTournaments = useCallback(
    async (isRefresh = false, isLoadMore = false) => {
      try {
        if (!isRefresh && !isLoadMore) setLoading(true);
        if (isLoadMore) setLoadingMore(true);
        setNetworkError(false);

        const targetPage = isLoadMore ? page + 1 : 1;
        const params: any = { page: targetPage, sort };
        if (category !== 'All') {
          params.category = category;
        }

        const response = await tournamentService.getTournaments(params);
        
        if (isLoadMore) {
          setTournaments(prev => [...prev, ...response]);
        } else {
          setTournaments(response);
        }

        setPage(targetPage);
        setHasMore(response.length >= 15); // Assuming 15 per page is backend default

      } catch (e) {
        setNetworkError(true);
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [category, page, sort],
  );

  useEffect(() => {
    fetchTournaments();
  }, [category, sort]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTournaments(true);
  }, [fetchTournaments]);

  const onLoadMore = useCallback(() => {
    if (!loadingMore && hasMore && !loading && !refreshing) {
      fetchTournaments(false, true);
    }
  }, [loadingMore, hasMore, loading, refreshing, fetchTournaments]);

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

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color={Colors.primary.main} />
      </View>
    );
  }, [loadingMore]);

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
            ListFooterComponent={renderFooter}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
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
  footerLoader: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
});

export default React.memo(TournamentScreen);
