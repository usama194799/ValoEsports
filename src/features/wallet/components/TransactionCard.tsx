import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { Transaction } from '../constants/mockData';

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'Tournament Reward':
      return 'trophy';
    case 'Entry Fee':
      return 'ticket-confirmation';
    case 'Withdrawal':
      return 'bank-transfer-out';
    case 'Wallet Top-up':
      return 'wallet-plus';
    case 'Referral Bonus':
      return 'account-group';
    case 'Refund':
      return 'cash-refund';
    default:
      return 'swap-horizontal';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return Colors.gaming.open; // Green
    case 'Pending':
      return Colors.gaming.rankGold; // Yellow
    case 'Failed':
      return Colors.gaming.live; // Red
    default:
      return Colors.text.muted;
  }
};

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onPress,
}) => {
  const isPositive = transaction.amount > 0;
  const amountPrefix = isPositive ? '+' : '';
  const amountColor = isPositive ? Colors.gaming.open : Colors.text.primary;

  const iconName = getTransactionIcon(transaction.type);
  const statusColor = getStatusColor(transaction.status);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={24} color={Colors.text.secondary} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Heading style={styles.title} numberOfLines={1}>
            {transaction.type}
          </Heading>
          <Heading style={[styles.amount, { color: amountColor }]}>
            {amountPrefix}PKR {Math.abs(transaction.amount).toLocaleString()}
          </Heading>
        </View>

        <View style={styles.row}>
          <Label style={styles.subtitle}>{transaction.date}</Label>
          <View style={styles.statusBadge}>
            <View
              style={[styles.statusDot, { backgroundColor: statusColor }]}
            />
            <Label style={[styles.statusText, { color: statusColor }]}>
              {transaction.status}
            </Label>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  detailsContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 15,
    color: Colors.text.primary,
  },
  amount: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TransactionCard;
