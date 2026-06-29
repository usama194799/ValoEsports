import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

import { MOCK_WALLET } from '../constants/mockData';

const WITHDRAW_METHODS = [
  { id: 'jazzcash', name: 'JazzCash', icon: 'cellphone' },
  { id: 'easypaisa', name: 'EasyPaisa', icon: 'cellphone-message' },
  { id: 'bank', name: 'Bank Transfer', icon: 'bank' },
];

const WithdrawFundsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState('jazzcash');
  const [amount, setAmount] = useState('');

  const withdrawAmount = parseInt(amount, 10) || 0;
  const isAmountValid =
    withdrawAmount > 0 && withdrawAmount <= MOCK_WALLET.availableBalance;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Withdraw Funds</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Available Balance */}
        <View style={styles.balanceCard}>
          <Label style={styles.balanceLabel}>Available for Withdrawal</Label>
          <View style={styles.balanceRow}>
            <Heading style={styles.currency}>PKR</Heading>
            <Heading style={styles.balanceAmount}>
              {MOCK_WALLET.availableBalance.toLocaleString()}
            </Heading>
          </View>
        </View>

        {/* Payment Method */}
        <Heading style={styles.sectionTitle}>Select Method</Heading>
        <View style={styles.methodsContainer}>
          {WITHDRAW_METHODS.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodBtn,
                selectedMethod === method.id && styles.methodBtnSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.8}
            >
              <Icon
                name={method.icon}
                size={24}
                color={
                  selectedMethod === method.id
                    ? Colors.primary.main
                    : Colors.text.secondary
                }
              />
              <Subheading
                style={[
                  styles.methodText,
                  selectedMethod === method.id && styles.methodTextSelected,
                ]}
              >
                {method.name}
              </Subheading>
            </TouchableOpacity>
          ))}
        </View>

        {/* Amount Input */}
        <Heading style={styles.sectionTitle}>Withdrawal Amount</Heading>
        <View
          style={[
            styles.inputContainer,
            withdrawAmount > MOCK_WALLET.availableBalance && styles.inputError,
          ]}
        >
          <Heading style={styles.inputCurrency}>PKR</Heading>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor={Colors.text.muted}
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {withdrawAmount > MOCK_WALLET.availableBalance && (
          <Label style={styles.errorText}>
            Amount exceeds available balance.
          </Label>
        )}

        {/* Processing Info */}
        <View style={styles.infoBox}>
          <Icon
            name="information-outline"
            size={20}
            color={Colors.text.secondary}
          />
          <Subheading style={styles.infoText}>
            Estimated processing time is 2-3 business days. Minimum withdrawal
            is PKR 500.
          </Subheading>
        </View>
      </ScrollView>

      {/* Fixed Bottom Action */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            !isAmountValid && styles.primaryBtnDisabled,
          ]}
          disabled={!isAmountValid}
          activeOpacity={0.8}
        >
          <Heading style={styles.btnText}>
            Withdraw PKR {withdrawAmount || 0}
          </Heading>
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
    paddingBottom: 100, // padding for bottom bar
  },
  balanceCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginBottom: Spacing.xl,
  },
  balanceLabel: {
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 20,
    color: Colors.text.muted,
    marginRight: 8,
  },
  balanceAmount: {
    fontSize: 42,
    color: Colors.gaming.open, // Success green for withdrawable
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  methodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  methodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    minWidth: '45%',
  },
  methodBtnSelected: {
    borderColor: Colors.primary.main,
    backgroundColor: Colors.primary.transparent.light,
  },
  methodText: {
    marginLeft: Spacing.sm,
    color: Colors.text.primary,
  },
  methodTextSelected: {
    color: Colors.primary.main,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.lg,
    height: 64,
    marginBottom: Spacing.xs,
  },
  inputError: {
    borderColor: Colors.gaming.live,
  },
  inputCurrency: {
    fontSize: 18,
    color: Colors.text.primary,
    marginRight: Spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 24,
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
  errorText: {
    color: Colors.gaming.live,
    fontSize: 12,
    marginBottom: Spacing.md,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.cardAlt,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginTop: Spacing.xl,
  },
  infoText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.borderLight,
  },
  primaryBtn: {
    backgroundColor: Colors.primary.main,
    height: 56,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: {
    backgroundColor: Colors.neutral.borderLight,
  },
  btnText: {
    color: Colors.text.primary,
    fontSize: 16,
  },
});

export default WithdrawFundsScreen;
