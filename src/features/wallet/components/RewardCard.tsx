import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { Reward } from '../constants/mockData';

interface RewardCardProps {
  reward: Reward;
  onClaim?: () => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onClaim }) => {
  const progressPercent = Math.min(
    (reward.progress / reward.target) * 100,
    100,
  );
  const isCompleted = progressPercent === 100;

  const getRewardIcon = () => {
    switch (reward.rewardType) {
      case 'Coins':
        return 'database'; // Gold coin icon substitute
      case 'XP':
        return 'star-four-points';
      case 'Cash':
        return 'cash';
      default:
        return 'gift';
    }
  };

  return (
    <View style={[styles.card, reward.isLocked && styles.cardLocked]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Heading style={styles.title}>{reward.title}</Heading>
          {reward.isLocked && (
            <Icon name="lock" size={16} color={Colors.text.muted} />
          )}
        </View>
        <View style={styles.rewardPill}>
          <Icon
            name={getRewardIcon()}
            size={14}
            color={Colors.gaming.rankGold}
          />
          <Label style={styles.rewardText}>
            {reward.rewardAmount} {reward.rewardType}
          </Label>
        </View>
      </View>

      <Subheading style={styles.description}>{reward.description}</Subheading>

      <View style={styles.progressSection}>
        <View style={styles.progressTextRow}>
          <Label style={styles.progressLabel}>Progress</Label>
          <Label style={styles.progressValue}>
            {reward.progress} / {reward.target}
          </Label>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progressPercent}%` },
              isCompleted && styles.progressBarComplete,
            ]}
          />
        </View>
      </View>

      {reward.claimable && isCompleted && !reward.isLocked && (
        <TouchableOpacity
          style={styles.claimBtn}
          onPress={onClaim}
          activeOpacity={0.8}
        >
          <Heading style={styles.claimBtnText}>Claim Reward</Heading>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginBottom: Spacing.md,
  },
  cardLocked: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.md,
  },
  title: {
    fontSize: 16,
    color: Colors.text.primary,
    marginRight: Spacing.sm,
  },
  rewardPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(175, 137, 43, 0.15)', // rankGold with opacity
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(175, 137, 43, 0.3)',
  },
  rewardText: {
    color: Colors.gaming.rankGold,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  description: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
    marginBottom: Spacing.lg,
  },
  progressSection: {
    marginBottom: Spacing.sm,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  progressValue: {
    fontSize: 11,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.dark.background,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: 3,
  },
  progressBarComplete: {
    backgroundColor: Colors.gaming.open, // Success color
  },
  claimBtn: {
    marginTop: Spacing.md,
    backgroundColor: Colors.gaming.open,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  claimBtnText: {
    color: Colors.dark.background,
    fontSize: 14,
  },
});

export default RewardCard;
