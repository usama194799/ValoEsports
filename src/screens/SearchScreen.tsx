import React, { useState, useCallback, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ROUTES } from '../navigation/routes';
import { Tournament } from '../types';
import { db } from '../data/db';
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

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return db.tournaments.filter(
      t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.gameName.toLowerCase().includes(query.toLowerCase()) ||
        (t.organizer &&
          t.organizer.toLowerCase().includes(query.toLowerCase())),
    );
  }, [query]);

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

        {/* Trending */}
        <View style={styles.section}>
          <Heading style={styles.sectionTitle}>Trending Tournaments</Heading>
          {TRENDING.map((item, i) => (
            <TouchableOpacity
              key={item}
              style={styles.trendingRow}
              onPress={() => setQuery(item)}
            >
              <View style={styles.trendingRank}>
                <Label style={styles.trendingRankText}>{i + 1}</Label>
              </View>
              <Subheading style={styles.trendingName}>{item}</Subheading>
              <Icon name="trending-up" size={18} color={Colors.primary.main} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <SearchHeader
            autoFocus
            value={query}
            onChangeText={setQuery}
            placeholder="Search game, organizer..."
          />
        </View>
      </View>

      {query.trim() && searchResults.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlashList
            data={searchResults}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            keyboardDismissMode="on-drag"
            estimatedItemSize={120}
          />
        </View>
      ) : (
        renderEmptySearch()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.borderLight,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    padding: Spacing.xs,
  },
  searchWrapper: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
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
    fontSize: 16,
  },
  clearText: {
    color: Colors.primary.main,
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
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    gap: 6,
  },
  historyLabel: {
    fontSize: 12,
  },
  trendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.borderLight,
  },
  trendingRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  trendingRankText: {
    fontSize: 12,
    fontWeight: '700',
  },
  trendingName: {
    flex: 1,
    fontSize: 14,
  },
});

export default React.memo(SearchScreen);
