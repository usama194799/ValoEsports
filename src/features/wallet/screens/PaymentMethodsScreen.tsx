import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading } from '../../../components/Typography';

import PaymentMethodCard from '../components/PaymentMethodCard';
import { MOCK_PAYMENT_METHODS } from '../constants/mockData';

const PaymentMethodsScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Payment Methods</Heading>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="plus" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Heading style={styles.sectionTitle}>Saved Methods</Heading>

        <View style={styles.listContainer}>
          {MOCK_PAYMENT_METHODS.map(method => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              onRemove={() => console.log('Remove method', method.id)}
              onSetDefault={() => console.log('Set default', method.id)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.addMethodBtn} activeOpacity={0.8}>
          <Icon name="plus" size={24} color={Colors.primary.main} />
          <Heading style={styles.addMethodText}>Add Payment Method</Heading>
        </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  listContainer: {
    marginBottom: Spacing.xl,
  },
  addMethodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    borderStyle: 'dashed',
  },
  addMethodText: {
    color: Colors.primary.main,
    marginLeft: Spacing.md,
    fontSize: 16,
  },
});

export default PaymentMethodsScreen;
