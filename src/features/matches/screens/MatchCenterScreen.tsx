import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
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
import { MOCK_MATCHES } from '../constants/mockData';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.MATCH_CENTER
>['navigation'];

const TABS = ['Upcoming', 'Live', 'Completed'] as const;
type TabType = (typeof TABS)[number];

const MatchCenterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<TabType>('Upcoming');

  const upcomingMatches = MOCK_MATCHES.filter(m => m.status === 'upcoming');
  const liveMatches = MOCK_MATCHES.filter(m => m.status === 'live');
  const completedMatches = MOCK_MATCHES.filter(m => m.status === 'completed');

  const getActiveData = () => {
    switch (activeTab) {
      case 'Upcoming':
        return upcomingMatches;
      case 'Live':
        return liveMatches;
      case 'Completed':
        return completedMatches;
      default:
        return [];
    }
  };

  const handleMatchPress = useCallback(
    (match: MatchData) => {
      if (match.status === 'live') {
        navigation.navigate(ROUTES.LIVE_MATCH, { matchId: match.id });
      } else if (match.status === 'completed') {
        navigation.navigate(ROUTES.MATCH_RESULT, { matchId: match.id });
      } else {
        navigation.navigate(ROUTES.MATCH_DETAILS_MODAL, { matchId: match.id });
      }
    },
    [navigation],
  );

  const handleBracketPress = useCallback(() => {
    navigation.navigate(ROUTES.TOURNAMENT_BRACKET, {
      tournamentId: 'tourney_1',
    });
  }, [navigation]);

  const renderSummaryCard = (
    title: string,
    value: string | number,
    icon: string,
    color: string,
  ) => (
    <View style={styles.summaryCard}>
      <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Heading style={styles.summaryValue}>{value}</Heading>
      <Label style={styles.summaryTitle}>{title}</Label>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.summaryRow}>
        {renderSummaryCard(
          'Live',
          liveMatches.length,
          'access-point-network',
          Colors.danger.main,
        )}
        {renderSummaryCard(
          'Upcoming',
          upcomingMatches.length,
          'calendar-clock',
          Colors.primary.main,
        )}
        {renderSummaryCard(
          'Completed',
          completedMatches.length,
          'check-circle-outline',
          Colors.success.main,
        )}
        {renderSummaryCard(
          'Total Wins',
          24,
          'trophy-outline',
          Colors.gaming.rankGold,
        )}
      </View>

      <TouchableOpacity
        style={styles.bracketBtn}
        onPress={handleBracketPress}
        activeOpacity={0.8}
      >
        <Icon name="tournament" size={20} color={Colors.primary.main} />
        <Heading style={styles.bracketBtnText}>
          View Tournament Brackets
        </Heading>
        <Icon name="chevron-right" size={20} color={Colors.text.muted} />
      </TouchableOpacity>

      <View style={styles.tabsContainer}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Label
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Label>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon
        name="gamepad-variant-outline"
        size={64}
        color={Colors.text.muted}
      />
      <Heading style={styles.emptyTitle}>No {activeTab} Matches</Heading>
      <Label style={styles.emptySubtitle}>Check back later for updates.</Label>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Match Center</Heading>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate(ROUTES.MATCHES_HISTORY_GLOBAL)}
        >
          <Icon name="history" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <FlashList
        data={getActiveData()}
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  iconBtn: {
    padding: Spacing.sm,
  },
  appBarTitle: {
    fontSize: 18,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  headerContent: {
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  summaryValue: {
    fontSize: 20,
    marginBottom: 2,
  },
  summaryTitle: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  bracketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.transparent.light,
    borderWidth: 1,
    borderColor: Colors.primary.main,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  bracketBtnText: {
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.primary.main,
    fontSize: 15,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  activeTab: {
    backgroundColor: Colors.primary.glow,
  },
  tabText: {
    color: Colors.text.secondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.primary.main,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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

export default MatchCenterScreen;
