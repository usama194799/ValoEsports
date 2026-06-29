import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackScreenProps } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

import TransactionCard from '../components/TransactionCard';
import { MOCK_WALLET, MOCK_TRANSACTIONS } from '../constants/mockData';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.WALLET_DASHBOARD
>['navigation'];

const WalletDashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const recentTransactions = MOCK_TRANSACTIONS.slice(0, 3);

  const renderQuickAction = (icon: string, label: string, route: any) => (
    <TouchableOpacity
      style={styles.quickActionBox}
      onPress={() => navigation.navigate(route)}
      activeOpacity={0.8}
    >
      <View style={styles.quickActionIcon}>
        <Icon name={icon} size={24} color={Colors.primary.main} />
      </View>
      <Label style={styles.quickActionLabel}>{label}</Label>
    </TouchableOpacity>
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
        <Heading style={styles.appBarTitle}>Wallet</Heading>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate(ROUTES.REFERRAL_REWARDS)}
        >
          <Icon
            name="account-multiple-plus"
            size={24}
            color={Colors.text.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Label style={styles.heroLabel}>Total Balance</Label>
          <View style={styles.balanceRow}>
            <Heading style={styles.currencySymbol}>PKR</Heading>
            <Heading style={styles.mainBalance}>
              {MOCK_WALLET.totalBalance.toLocaleString()}
            </Heading>
          </View>

          <View style={styles.subBalanceContainer}>
            <View style={styles.subBalanceCol}>
              <Label style={styles.subLabel}>Available</Label>
              <Subheading style={styles.subValue}>
                PKR {MOCK_WALLET.availableBalance.toLocaleString()}
              </Subheading>
            </View>
            <View style={styles.divider} />
            <View style={styles.subBalanceCol}>
              <Label style={styles.subLabel}>Pending</Label>
              <Subheading style={styles.subValue}>
                PKR {MOCK_WALLET.pendingBalance.toLocaleString()}
              </Subheading>
            </View>
            <View style={styles.divider} />
            <View style={styles.subBalanceCol}>
              <Label style={styles.subLabel}>Bonus</Label>
              <Subheading
                style={[styles.subValue, { color: Colors.gaming.rankGold }]}
              >
                PKR {MOCK_WALLET.bonusBalance.toLocaleString()}
              </Subheading>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          {renderQuickAction('plus', 'Add Money', ROUTES.ADD_BALANCE)}
          {renderQuickAction(
            'arrow-top-right',
            'Withdraw',
            ROUTES.WITHDRAW_FUNDS,
          )}
          {renderQuickAction('gift', 'Rewards', ROUTES.REWARDS_CENTER)}
          {renderQuickAction('history', 'History', ROUTES.WALLET_TRANSACTIONS)}
        </View>

        {/* Charts Mockup */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heading style={styles.sectionTitle}>Overview</Heading>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.COINS_XP)}
            >
              <Label style={styles.seeAllText}>View XP</Label>
            </TouchableOpacity>
          </View>
          <View style={styles.chartMockup}>
            <View style={styles.chartBar}>
              <View style={[styles.chartFill, { height: '40%' }]} />
            </View>
            <View style={styles.chartBar}>
              <View style={[styles.chartFill, { height: '70%' }]} />
            </View>
            <View style={styles.chartBar}>
              <View style={[styles.chartFill, { height: '30%' }]} />
            </View>
            <View style={styles.chartBar}>
              <View style={[styles.chartFill, { height: '90%' }]} />
            </View>
            <View style={styles.chartBar}>
              <View style={[styles.chartFill, { height: '50%' }]} />
            </View>
            <View style={styles.chartBar}>
              <View style={[styles.chartFill, { height: '80%' }]} />
            </View>
          </View>
          <View style={styles.chartLabels}>
            <Label style={styles.chartLabelText}>Mon</Label>
            <Label style={styles.chartLabelText}>Tue</Label>
            <Label style={styles.chartLabelText}>Wed</Label>
            <Label style={styles.chartLabelText}>Thu</Label>
            <Label style={styles.chartLabelText}>Fri</Label>
            <Label style={styles.chartLabelText}>Sat</Label>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heading style={styles.sectionTitle}>Recent Activity</Heading>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.WALLET_TRANSACTIONS)}
            >
              <Label style={styles.seeAllText}>See All</Label>
            </TouchableOpacity>
          </View>
          <View style={styles.cardList}>
            {recentTransactions.map(tx => (
              <TransactionCard
                key={tx.id}
                transaction={tx}
                onPress={() =>
                  navigation.navigate(ROUTES.TRANSACTION_DETAILS, {
                    transactionId: tx.id,
                  })
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  heroCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primary.glow,
    marginBottom: Spacing.xl,
  },
  heroLabel: {
    color: Colors.text.muted,
    fontSize: 14,
    marginBottom: Spacing.xs,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.xl,
  },
  currencySymbol: {
    fontSize: 18,
    color: Colors.text.secondary,
    marginRight: 8,
  },
  mainBalance: {
    fontSize: 42,
    color: Colors.text.primary,
    letterSpacing: 1,
  },
  subBalanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardAlt,
    padding: Spacing.md,
    borderRadius: Radius.lg,
  },
  subBalanceCol: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.neutral.border,
  },
  subLabel: {
    fontSize: 11,
    color: Colors.text.muted,
    marginBottom: Spacing.xs,
  },
  subValue: {
    fontSize: 13,
    color: Colors.text.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  quickActionBox: {
    alignItems: 'center',
    width: '23%',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  quickActionLabel: {
    fontSize: 11,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
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
  seeAllText: {
    color: Colors.primary.main,
    fontSize: 14,
  },
  cardList: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  chartMockup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  chartBar: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: Colors.dark.cardAlt,
    borderTopLeftRadius: Radius.sm,
    borderTopRightRadius: Radius.sm,
    justifyContent: 'flex-end',
    height: '100%',
  },
  chartFill: {
    backgroundColor: Colors.primary.main,
    borderTopLeftRadius: Radius.sm,
    borderTopRightRadius: Radius.sm,
    opacity: 0.8,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
  },
  chartLabelText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    color: Colors.text.muted,
  },
});

export default WalletDashboardScreen;
