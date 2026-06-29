import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackScreenProps } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label } from '../../../components/Typography';

import TransactionCard from '../components/TransactionCard';
import CategoryChips from '../../../components/CategoryChips';
import { MOCK_TRANSACTIONS, Transaction } from '../constants/mockData';

const FILTERS = [
  'All',
  'Credits',
  'Debits',
  'Rewards',
  'Withdrawals',
  'Entry Fees',
];

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.WALLET_TRANSACTIONS
>['navigation'];

const WalletTransactionsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTransactions = useMemo(() => {
    let result = MOCK_TRANSACTIONS;

    if (activeFilter !== 'All') {
      if (activeFilter === 'Credits') {
        result = result.filter(tx => tx.amount > 0);
      } else if (activeFilter === 'Debits') {
        result = result.filter(tx => tx.amount < 0);
      } else if (activeFilter === 'Rewards') {
        result = result.filter(tx => tx.type.includes('Reward'));
      } else if (activeFilter === 'Withdrawals') {
        result = result.filter(tx => tx.type === 'Withdrawal');
      } else if (activeFilter === 'Entry Fees') {
        result = result.filter(tx => tx.type === 'Entry Fee');
      }
    }

    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        tx =>
          tx.referenceId.toLowerCase().includes(lowerQuery) ||
          tx.type.toLowerCase().includes(lowerQuery) ||
          tx.amount.toString().includes(lowerQuery),
      );
    }

    return result;
  }, [searchQuery, activeFilter]);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="receipt" size={64} color={Colors.neutral.borderLight} />
      <Heading style={styles.emptyTitle}>No Transactions Found</Heading>
      <Label style={styles.emptySubtitle}>
        Try adjusting your filters or search.
      </Label>
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
        <Heading style={styles.appBarTitle}>Transaction History</Heading>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="calendar-month" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="magnify" size={20} color={Colors.text.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Reference ID, Amount..."
            placeholderTextColor={Colors.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={18} color={Colors.text.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <CategoryChips
          categories={FILTERS}
          activeCategory={activeFilter}
          onSelectCategory={setActiveFilter}
        />
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={filteredTransactions}
          keyExtractor={(item: Transaction) => item.id}
          estimatedItemSize={75}
          ListEmptyComponent={renderEmptyState}
          renderItem={({ item }) => (
            <TransactionCard
              transaction={item}
              onPress={() =>
                navigation.navigate(ROUTES.TRANSACTION_DETAILS, {
                  transactionId: item.id,
                })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
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
  },
  iconBtn: {
    padding: Spacing.sm,
  },
  appBarTitle: {
    fontSize: 18,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.dark.surface,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.text.primary,
    fontSize: 14,
  },
  filtersContainer: {
    backgroundColor: Colors.dark.surface,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: 18,
    marginTop: Spacing.md,
    color: Colors.text.primary,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.text.muted,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});

export default WalletTransactionsScreen;
