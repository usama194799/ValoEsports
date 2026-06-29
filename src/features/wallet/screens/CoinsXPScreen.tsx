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
import { Heading, Label, Subheading } from '../../../components/Typography';

import { MOCK_LEVEL_DATA } from '../constants/mockData';

const CoinsXPScreen: React.FC = () => {
  const navigation = useNavigation();

  const progressPercent = Math.min(
    (MOCK_LEVEL_DATA.currentXP / MOCK_LEVEL_DATA.nextLevelXP) * 100,
    100,
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
        <Heading style={styles.appBarTitle}>Coins & XP</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balances Card */}
        <View style={styles.balancesContainer}>
          <View style={styles.balanceBox}>
            <View style={styles.iconCircle}>
              <Icon name="database" size={32} color={Colors.gaming.rankGold} />
            </View>
            <Heading style={styles.balanceAmount}>
              {MOCK_LEVEL_DATA.currentCoins.toLocaleString()}
            </Heading>
            <Label style={styles.balanceLabel}>Total Coins</Label>
          </View>

          <View style={styles.balanceBox}>
            <View
              style={[styles.iconCircle, { borderColor: Colors.gaming.open }]}
            >
              <Icon
                name="star-four-points"
                size={32}
                color={Colors.gaming.open}
              />
            </View>
            <Heading style={styles.balanceAmount}>
              {MOCK_LEVEL_DATA.currentXP.toLocaleString()}
            </Heading>
            <Label style={styles.balanceLabel}>Total XP</Label>
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View>
              <Label style={styles.levelLabel}>Current Level</Label>
              <Heading style={styles.levelNumber}>
                Level {MOCK_LEVEL_DATA.currentLevel}
              </Heading>
            </View>
            <View style={styles.nextRewardBox}>
              <Icon name="gift" size={16} color={Colors.primary.main} />
              <Subheading style={styles.nextRewardText}>
                {MOCK_LEVEL_DATA.nextReward}
              </Subheading>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressTextRow}>
              <Label style={styles.progressLabel}>Progress</Label>
              <Label style={styles.progressValue}>
                {MOCK_LEVEL_DATA.currentXP.toLocaleString()} /{' '}
                {MOCK_LEVEL_DATA.nextLevelXP.toLocaleString()} XP
              </Label>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Recent Activity Dummy */}
        <View style={styles.section}>
          <Heading style={styles.sectionTitle}>Recent Earnings</Heading>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Icon
                name="star-four-points"
                size={20}
                color={Colors.gaming.open}
              />
            </View>
            <View style={styles.activityDetails}>
              <Heading style={styles.activityTitle}>Match Completion</Heading>
              <Label style={styles.activityTime}>2 hours ago</Label>
            </View>
            <Heading style={styles.activityGain}>+150 XP</Heading>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Icon name="database" size={20} color={Colors.gaming.rankGold} />
            </View>
            <View style={styles.activityDetails}>
              <Heading style={styles.activityTitle}>Daily Login</Heading>
              <Label style={styles.activityTime}>Today, 09:00 AM</Label>
            </View>
            <Heading
              style={[styles.activityGain, { color: Colors.gaming.rankGold }]}
            >
              +50 Coins
            </Heading>
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
  balancesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  balanceBox: {
    flex: 1,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginHorizontal: Spacing.xs,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.gaming.rankGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    backgroundColor: Colors.dark.background,
  },
  balanceAmount: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  balanceLabel: {
    color: Colors.text.muted,
  },
  levelCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginBottom: Spacing.xl,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  levelLabel: {
    color: Colors.text.muted,
    marginBottom: Spacing.xs,
  },
  levelNumber: {
    fontSize: 28,
    color: Colors.primary.main,
  },
  nextRewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(232, 33, 74, 0.1)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  nextRewardText: {
    color: Colors.primary.main,
    fontSize: 12,
    marginLeft: 4,
  },
  progressSection: {
    width: '100%',
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  progressValue: {
    fontSize: 12,
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Colors.dark.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.gaming.open,
    borderRadius: 4,
  },
  section: {
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: Spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
  },
  activityTime: {
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 2,
  },
  activityGain: {
    fontSize: 15,
    color: Colors.gaming.open,
  },
});

export default CoinsXPScreen;
