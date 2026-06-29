import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Radius} from '../../../theme/radius';
import {Spacing} from '../../../theme/spacing';
import {Achievement} from '../types/profile';

interface AchievementCardProps {
  achievement: Achievement;
}

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.xl * 2 - Spacing.md) / 2;

const AchievementCard: React.FC<AchievementCardProps> = ({achievement}) => {
  const {title, description, icon, isUnlocked, progress, total} = achievement;
  const progressPercentage = Math.min(100, Math.max(0, (progress / total) * 100));

  return (
    <View style={[styles.container, !isUnlocked && styles.lockedContainer]}>
      <View style={[styles.iconWrapper, isUnlocked ? styles.unlockedIcon : styles.lockedIcon]}>
        <Icon
          name={icon}
          size={24}
          color={isUnlocked ? Colors.primary.main : Colors.text.muted}
        />
      </View>
      
      <Subheading style={[styles.title, !isUnlocked && styles.lockedText]} numberOfLines={1}>
        {title}
      </Subheading>
      <Label style={styles.description} numberOfLines={2}>
        {description}
      </Label>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {width: `${progressPercentage}%`},
              isUnlocked && {backgroundColor: Colors.success.main},
            ]}
          />
        </View>
        <Label style={styles.progressText}>
          {progress} / {total}
        </Label>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  lockedContainer: {
    opacity: 0.7,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  unlockedIcon: {
    backgroundColor: Colors.primary.glow,
  },
  lockedIcon: {
    backgroundColor: Colors.neutral.borderLight,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  lockedText: {
    color: Colors.text.secondary,
  },
  description: {
    fontSize: 11,
    color: Colors.text.muted,
    marginBottom: Spacing.md,
    height: 30, // Fixed height for 2 lines to keep grid aligned
  },
  progressContainer: {
    marginTop: 'auto',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: Colors.neutral.borderLight,
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: Colors.text.muted,
    textAlign: 'right',
  },
});

export default React.memo(AchievementCard);
