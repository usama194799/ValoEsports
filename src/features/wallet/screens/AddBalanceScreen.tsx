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

const SUGGESTED_AMOUNTS = [500, 1000, 2000, 5000];

const PAYMENT_METHODS = [
  { id: 'jazzcash', name: 'JazzCash', icon: 'cellphone' },
  { id: 'easypaisa', name: 'EasyPaisa', icon: 'cellphone-message' },
  { id: 'visa', name: 'Visa **** 4242', icon: 'credit-card' },
  { id: 'mastercard', name: 'MasterCard', icon: 'credit-card-outline' },
];

const AddBalanceScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('visa');

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const handleSuggestedAmountPress = (val: number) => {
    setSelectedAmount(val);
    setCustomAmount('');
  };

  const finalAmount =
    selectedAmount !== null ? selectedAmount : parseInt(customAmount, 10) || 0;
  const isAmountValid = finalAmount > 0;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Add Balance</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Amount Input */}
        <Heading style={styles.sectionTitle}>Enter Amount</Heading>
        <View style={styles.inputContainer}>
          <Heading style={styles.inputCurrency}>PKR</Heading>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor={Colors.text.muted}
            value={
              selectedAmount !== null ? selectedAmount.toString() : customAmount
            }
            onChangeText={handleCustomAmountChange}
          />
        </View>

        {/* Suggested Amounts */}
        <View style={styles.suggestedContainer}>
          {SUGGESTED_AMOUNTS.map(amt => (
            <TouchableOpacity
              key={amt}
              style={[
                styles.suggestedBtn,
                selectedAmount === amt && styles.suggestedBtnActive,
              ]}
              onPress={() => handleSuggestedAmountPress(amt)}
              activeOpacity={0.8}
            >
              <Heading
                style={[
                  styles.suggestedBtnText,
                  selectedAmount === amt && styles.suggestedBtnTextActive,
                ]}
              >
                {amt}
              </Heading>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Method */}
        <Heading style={styles.sectionTitle}>Payment Method</Heading>
        <View style={styles.methodsContainer}>
          {PAYMENT_METHODS.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodRow,
                selectedMethod === method.id && styles.methodRowSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.8}
            >
              <View style={styles.methodIconBox}>
                <Icon
                  name={method.icon}
                  size={24}
                  color={
                    selectedMethod === method.id
                      ? Colors.primary.main
                      : Colors.text.secondary
                  }
                />
              </View>
              <Subheading style={styles.methodText}>{method.name}</Subheading>
              {selectedMethod === method.id && (
                <Icon
                  name="check-circle"
                  size={24}
                  color={Colors.primary.main}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addMethodBtn}>
          <Icon name="plus" size={20} color={Colors.primary.main} />
          <Heading style={styles.addMethodText}>Add New Method</Heading>
        </TouchableOpacity>
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
            Proceed to Pay PKR {finalAmount}
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
  sectionTitle: {
    fontSize: 16,
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.lg,
    height: 72,
    marginBottom: Spacing.lg,
  },
  inputCurrency: {
    fontSize: 24,
    color: Colors.text.muted,
    marginRight: Spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 36,
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
  suggestedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  suggestedBtn: {
    flex: 1,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    paddingVertical: Spacing.sm,
    marginHorizontal: 4,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  suggestedBtnActive: {
    borderColor: Colors.primary.main,
    backgroundColor: Colors.primary.transparent.light, // Changed from hex to rgba manually assuming primary glow like
  },
  suggestedBtnText: {
    color: Colors.text.primary,
    fontSize: 16,
  },
  suggestedBtnTextActive: {
    color: Colors.primary.main,
  },
  methodsContainer: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    overflow: 'hidden',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  methodRowSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  methodIconBox: {
    width: 40,
    height: 40,
    backgroundColor: Colors.dark.background,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  methodText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.primary,
  },
  addMethodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    marginTop: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    borderStyle: 'dashed',
  },
  addMethodText: {
    color: Colors.primary.main,
    marginLeft: Spacing.sm,
    fontSize: 15,
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

export default AddBalanceScreen;
