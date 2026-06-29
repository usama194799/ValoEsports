import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  RootStackScreenProps,
  RootStackParamList,
} from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

import { MOCK_TRANSACTIONS } from '../constants/mockData';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.TRANSACTION_DETAILS
>['navigation'];
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.TRANSACTION_DETAILS
>;

const TransactionDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { transactionId } = route.params;

  const transaction =
    MOCK_TRANSACTIONS.find(t => t.id === transactionId) || MOCK_TRANSACTIONS[0];
  const isPositive = transaction.amount > 0;
  const amountPrefix = isPositive ? '+' : '';
  const amountColor = isPositive ? Colors.gaming.open : Colors.text.primary;

  const renderDetailRow = (label: string, value: string) => (
    <View style={styles.detailRow}>
      <Label style={styles.detailLabel}>{label}</Label>
      <Subheading style={styles.detailValue}>{value}</Subheading>
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
        <Heading style={styles.appBarTitle}>Receipt</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Hero */}
        <View style={styles.heroContainer}>
          <View
            style={[
              styles.iconCircle,
              {
                borderColor:
                  transaction.status === 'Completed'
                    ? Colors.gaming.open
                    : Colors.gaming.rankGold,
              },
            ]}
          >
            <Icon
              name={
                transaction.status === 'Completed' ? 'check' : 'clock-outline'
              }
              size={32}
              color={
                transaction.status === 'Completed'
                  ? Colors.gaming.open
                  : Colors.gaming.rankGold
              }
            />
          </View>
          <Heading style={styles.heroTitle}>{transaction.status}</Heading>
          <Heading style={[styles.heroAmount, { color: amountColor }]}>
            {amountPrefix}PKR {Math.abs(transaction.amount).toLocaleString()}
          </Heading>
          <Label style={styles.heroDate}>
            {transaction.date} • {transaction.time}
          </Label>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          {renderDetailRow('Transaction Type', transaction.type)}
          {renderDetailRow('Payment Method', transaction.paymentMethod)}
          {renderDetailRow('Reference ID', transaction.referenceId)}

          <View style={styles.divider} />

          <Label style={styles.descriptionLabel}>Description</Label>
          <Subheading style={styles.descriptionText}>
            {transaction.description}
          </Subheading>

          <View style={styles.divider} />

          {/* Pricing Mock */}
          {renderDetailRow(
            'Amount',
            `PKR ${Math.abs(transaction.amount).toLocaleString()}`,
          )}
          {renderDetailRow('Tax & Fees', 'PKR 0.00')}
          <View style={styles.totalRow}>
            <Heading style={styles.totalLabel}>Total</Heading>
            <Heading style={styles.totalValue}>
              PKR {Math.abs(transaction.amount).toLocaleString()}
            </Heading>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8}>
          <Icon name="share-variant" size={20} color={Colors.text.primary} />
          <Heading style={styles.btnTextSecondary}>Share</Heading>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}>
          <Icon name="download" size={20} color={Colors.dark.background} />
          <Heading style={styles.btnTextPrimary}>Download</Heading>
        </TouchableOpacity>
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
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  heroContainer: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    backgroundColor: Colors.dark.surface,
  },
  heroTitle: {
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  heroAmount: {
    fontSize: 36,
    marginBottom: Spacing.xs,
  },
  heroDate: {
    color: Colors.text.muted,
  },
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.text.muted,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.borderLight,
    marginVertical: Spacing.md,
  },
  descriptionLabel: {
    fontSize: 13,
    color: Colors.text.muted,
    marginBottom: Spacing.xs,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 18,
    color: Colors.primary.main,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: Spacing.lg,
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.borderLight,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary.main,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.dark.cardAlt,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  btnTextPrimary: {
    color: Colors.dark.background,
    fontSize: 14,
    marginLeft: Spacing.sm,
  },
  btnTextSecondary: {
    color: Colors.text.primary,
    fontSize: 14,
    marginLeft: Spacing.sm,
  },
});

export default TransactionDetailsScreen;
