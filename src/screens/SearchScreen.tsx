import React, { useState, useCallback, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ROUTES } from '../navigation/routes';
import { Tournament } from '../types';
import { tournamentService } from '../services';
import SearchHeader from '../components/SearchHeader';
import TournamentListCard from '../components/TournamentListCard';
import EmptyState from '../components/EmptyState';
import { Heading, Label, Subheading } from '../components/Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Spacing } from '../theme/spacing';

const RECENT_SEARCHES = ['PUBG Global', 'Valorant Open', 'Free Fire Weekly'];
const TRENDING = ['Call of Duty Mobile Summer', 'BGMI Pro League'];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SearchScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setTournaments([]);
      return;
    }
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const results = await tournamentService.getTournaments({ search: debouncedQuery });
        setTournaments(results);
      } catch (e) {
        console.error('Search failed', e);
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [debouncedQuery]);

  const renderItem = useCallback(
    ({ item, index }: { item: Tournament; index: number }) => (
      <TournamentListCard
        item={item}
        index={index}
        onPress={() =>
          navigation.navigate(ROUTES.TOURNAMENT_DETAILS, {
            tournamentId: item.id,
          })
        }
      />
    ),
    [navigation],
  );

  const renderEmptySearch = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.main} />
        </View>
      );
    }
    if (query.trim()) {
      return (
        <EmptyState
          icon="text-search"
          title="No Results Found"
          message={`We couldn't find any tournaments matching "${query}".`}
        />
      );
    }

    return (
      <ScrollView
        style={styles.idleState}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Recent Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heading style={styles.sectionTitle}>Recent Searches</Heading>
            <TouchableOpacity>
              <Label style={styles.clearText}>Clear</Label>
            </TouchableOpacity>
          </View>
          <View style={styles.chipRow}>
            {RECENT_SEARCHES.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.historyChip}
                onPress={() => setQuery(item)}
              >
                <Icon name="history" size={14} color={Colors.text.muted} />
                <Label style={styles.historyLabel}>{item}</Label>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heading style={styles.sectionTitle}>Trending Now</Heading>
          </View>
          <View style={styles.trendingList}>
            {TRENDING.map((item, index) => (
              <TouchableOpacity
                key={item}
                style={styles.trendingItem}
                onPress={() => setQuery(item)}
              >
                <View style={styles.trendingRank}>
                  <Label
                    style={[
                      styles.rankText,
                      index < 3 && styles.topRankText,
                    ]}
                  >
                    #{index + 1}
                  </Label>
                </View>
                <Icon name="trending-up" size={16} color={Colors.primary.main} />
                <Subheading style={styles.trendingLabel}>{item}</Subheading>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <SearchHeader
        value={query}
        onChangeText={setQuery}
        autoFocus
      />
      <View style={styles.content}>
        {query.trim() && !loading && tournaments.length > 0 ? (
          <FlashList
            data={tournaments}
            renderItem={renderItem}
            estimatedItemSize={120}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          />
        ) : (
          renderEmptySearch()
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idleState: {
    flex: 1,
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
  },
  clearText: {
    color: Colors.text.muted,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  historyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    gap: Spacing.xs,
  },
  historyLabel: {
    color: Colors.text.secondary,
  },
  trendingList: {
    gap: Spacing.sm,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
  },
  trendingRank: {
    width: 24,
    alignItems: 'center',
  },
  rankText: {
    color: Colors.text.muted,
    fontSize: 14,
  },
  topRankText: {
    color: Colors.primary.main,
    fontWeight: 'bold',
  },
  trendingLabel: {
    flex: 1,
    color: Colors.text.primary,
  },
});

export default SearchScreen;
