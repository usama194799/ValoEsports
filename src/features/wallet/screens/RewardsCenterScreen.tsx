import React, { useState, useMemo } from 'react';
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
import { Heading } from '../../../components/Typography';
import CategoryChips from '../../../components/CategoryChips';

import RewardCard from '../components/RewardCard';
import { MOCK_REWARDS } from '../constants/mockData';

const TABS = ['Daily', 'Weekly', 'Season'];

const RewardsCenterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Daily');

  const filteredRewards = useMemo(() => {
    return MOCK_REWARDS.filter(reward => reward.category === activeTab);
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Rewards Center</Heading>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon
            name="help-circle-outline"
            size={24}
            color={Colors.text.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <CategoryChips
          categories={TABS}
          selectedCategory={activeTab}
          onSelect={setActiveTab}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredRewards.length > 0 ? (
          filteredRewards.map(reward => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onClaim={() => {
                // Mock claim
                console.log(`Claiming reward: ${reward.id}`);
              }}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon
              name="gift-off"
              size={64}
              color={Colors.neutral.borderLight}
            />
            <Heading style={styles.emptyTitle}>No Rewards Available</Heading>
          </View>
        )}
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
  tabsContainer: {
    backgroundColor: Colors.dark.surface,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    marginTop: Spacing.md,
    color: Colors.text.muted,
  },
});

export default RewardsCenterScreen;
