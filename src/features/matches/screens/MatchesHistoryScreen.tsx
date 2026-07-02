import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackScreenProps } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label } from '../../../components/Typography';

import MatchCard, { MatchData } from '../components/MatchCard';
import { matchService } from '../../../services/matchService';
import { ActivityIndicator } from 'react-native';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.MATCHES_HISTORY_GLOBAL
>['navigation'];

const MatchesHistoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [historyMatches, setHistoryMatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await matchService.getMatches({ status: 'completed' });
        setHistoryMatches(data);
      } catch (error) {
        console.error('Failed to load match history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredMatches = historyMatches.filter(
    match =>
      match.tournamentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.teamA?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.teamB?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleMatchPress = useCallback(
    (match: MatchData) => {
      navigation.navigate(ROUTES.MATCH_DETAILS_MODAL, { matchId: match.id });
    },
    [navigation],
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={Colors.text.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tournaments, teams..."
          placeholderTextColor={Colors.text.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={Colors.text.muted} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.filtersRow}>
        <TouchableOpacity style={styles.filterChip}>
          <Label style={styles.filterText}>All Games</Label>
          <Icon name="chevron-down" size={16} color={Colors.text.muted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Label style={styles.filterText}>All Results</Label>
          <Icon name="chevron-down" size={16} color={Colors.text.muted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Label style={styles.filterText}>Date</Label>
          <Icon name="chevron-down" size={16} color={Colors.text.muted} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.primary.main} />
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Icon name="history" size={64} color={Colors.text.muted} />
        <Heading style={styles.emptyTitle}>No Matches Found</Heading>
        <Label style={styles.emptySubtitle}>
          Try adjusting your search or filters.
        </Label>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Global Match History</Heading>
        <View style={styles.placeholder} />
      </View>

      <FlashList
        data={filteredMatches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MatchCard
            match={item as MatchData}
            onPress={() => handleMatchPress(item as MatchData)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        estimatedItemSize={200}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  iconBtn: {
    padding: Spacing.sm,
  },
  appBarTitle: {
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  headerContent: {
    marginBottom: Spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    color: Colors.text.primary,
    marginLeft: Spacing.sm,
    fontSize: 16,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardAlt,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  filterText: {
    fontSize: 12,
    marginRight: Spacing.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 18,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    color: Colors.text.muted,
  },
});

export default MatchesHistoryScreen;
