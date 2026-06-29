import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Tournament} from '../types';
import ProgressBar from './ProgressBar';
import LocationBadge from './LocationBadge';
import GameBadge from './GameBadge';
import OpenBadge from './OpenBadge';
import {Caption, Label} from './Typography';
import BadgeChip from './BadgeChip';
import {Colors} from '../theme/colors';
import {Radius} from '../theme/radius';
import {Shadows} from '../theme/shadow';
import {Spacing} from '../theme/spacing';
import {wp} from '../utils/responsive';
import AnimatedPressable from './AnimatedPressable';

interface UpcomingCardProps {
  item: Tournament;
  index: number;
  onPress?: () => void;
}

const CARD_WIDTH = wp(178);
const IMAGE_HEIGHT = wp(106);

const UpcomingCard: React.FC<UpcomingCardProps> = ({item, index, onPress}) => {
  const slotPercent = Math.round((item.slotsUsed / item.slots) * 100);
  const progress = item.slotsUsed / item.slots;

  const imageSource = useMemo(() => ({uri: item.image}), [item.image]);

  return (
    <AnimatedPressable onPress={onPress} style={[styles.card, Shadows.card]}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Animated.Image
            sharedTransitionTag={`upcoming-image-${item.id}`}
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Open Badge top-right */}
          <View style={styles.openBadgeContainer}>
            <OpenBadge />
          </View>
        </View>

        {/* Info */}
        <View style={styles.info}>
          {/* Badges Row */}
          <View style={styles.badgesRow}>
            <LocationBadge locationName={item.location} />
            <GameBadge gameName={`✕ ${item.mode}`} />
            <BadgeChip icon="account-group-outline" label={`${item.slots} slots`} />
          </View>

          {/* Progress Bar */}
          <ProgressBar
            progress={progress}
            label="Slots"
            percentage={slotPercent}
          />

          {/* Tournament Name */}
          <Caption style={styles.name} numberOfLines={1}>
            {item.name}
          </Caption>

          {/* Date & Time */}
          <View style={styles.dateRow}>
            <Icon name="calendar-outline" size={10} color={Colors.text.muted} />
            <Label style={styles.dateText}>{item.date}</Label>
            <Label style={styles.separator}>•</Label>
            <Icon name="clock-outline" size={10} color={Colors.text.muted} />
            <Label style={styles.dateText}>{item.time}</Label>
          </View>
        </View>
      </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.dark.card,
    borderRadius: Radius.card,
    overflow: 'hidden',
    marginRight: Spacing.md,
    borderWidth: 0.5,
    borderColor: Colors.neutral.border,
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  openBadgeContainer: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
  info: {
    padding: Spacing.sm,
    paddingBottom: Spacing.md,
    gap: Spacing.xs,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  name: {
    fontWeight: '700',
    fontSize: 11,
    marginTop: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dateText: {
    fontSize: 9,
    color: Colors.text.muted,
  },
  separator: {
    fontSize: 9,
    color: Colors.text.muted,
  },
});

export default React.memo(UpcomingCard);

