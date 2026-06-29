import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Tournament} from '../types';
import ProgressBar from './ProgressBar';
import LocationBadge from './LocationBadge';
import GameBadge from './GameBadge';
import BadgeChip from './BadgeChip';
import LiveBadge from './LiveBadge';
import OpenBadge from './OpenBadge';
import {Heading, Subheading, Caption, Label} from './Typography';
import {Colors} from '../theme/colors';
import {Radius} from '../theme/radius';
import {Shadows} from '../theme/shadow';
import {Spacing} from '../theme/spacing';
import {wp} from '../utils/responsive';
import AnimatedPressable from './AnimatedPressable';

interface TournamentListCardProps {
  item: Tournament;
  index: number;
  onPress?: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
}

const IMAGE_HEIGHT = wp(160);

const TournamentListCard: React.FC<TournamentListCardProps> = ({
  item,
  index,
  onPress,
  onFavorite,
  onShare,
}) => {
  const slotPercent = Math.round((item.slotsUsed / item.slots) * 100);
  const progress = item.slotsUsed / item.slots;

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, {duration: 400}));
    scale.value = withDelay(index * 100, withSpring(1, {damping: 15}));
  }, [index, opacity, scale]);

  const slideStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  const imageSource = useMemo(() => ({uri: item.image}), [item.image]);

  const renderBadge = () => {
    switch (item.status) {
      case 'live':
        return <LiveBadge />;
      case 'open':
        return <OpenBadge />;
      case 'upcoming':
        return <BadgeChip label="Upcoming" icon="clock-outline" />;
      case 'completed':
        return <BadgeChip label="Completed" icon="check" />;
    }
  };

  const favoriteIcon = item.isFavorite ? 'cards-heart' : 'cards-heart-outline';
  const favoriteColor = item.isFavorite ? Colors.primary.main : Colors.text.primary;

  return (
    <Animated.View style={[styles.container, slideStyle]}>
      <AnimatedPressable onPress={onPress} style={styles.cardInner}>
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <Animated.Image
            sharedTransitionTag={`list-image-${item.id}`}
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Status Badge */}
          <View style={styles.badgeTopRight}>{renderBadge()}</View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.titleWrapper}>
              <Heading style={styles.title} numberOfLines={1}>
                {item.name}
              </Heading>
              <Caption style={styles.organizer}>
                By {item.organizer || 'Unknown Organizer'}
              </Caption>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity onPress={onShare} style={styles.iconBtn}>
                <Icon name="share-variant-outline" size={20} color={Colors.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onFavorite} style={styles.iconBtn}>
                <Icon name={favoriteIcon} size={20} color={favoriteColor} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Badges Row */}
          <View style={styles.badgesRow}>
            <GameBadge gameName={item.gameName} />
            <LocationBadge locationName={item.location} />
            <BadgeChip label={item.mode} icon="account-multiple" />
          </View>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCol}>
              <Label style={styles.infoLabel}>Entry Fee</Label>
              <Subheading style={styles.infoValue}>{item.entryFee || 'Free'}</Subheading>
            </View>
            <View style={styles.infoCol}>
              <Label style={styles.infoLabel}>Prize Pool</Label>
              <Subheading style={[styles.infoValue, {color: Colors.gaming.rankGold}]}>
                {item.prizePool || 'TBA'}
              </Subheading>
            </View>
            <View style={styles.infoCol}>
              <Label style={styles.infoLabel}>Starts</Label>
              <Subheading style={styles.infoValue}>{item.date}</Subheading>
            </View>
          </View>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <ProgressBar
              progress={progress}
              label={`${item.slotsUsed}/${item.slots} Teams Joined`}
              percentage={slotPercent}
            />
            {item.registrationDeadline && (
              <Caption style={styles.deadline}>
                Closes: {item.registrationDeadline}
              </Caption>
            )}
          </View>

          {/* Footer Action */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.viewBtn}>
              <Label style={styles.viewBtnText}>View Details</Label>
            </TouchableOpacity>
          </View>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
    backgroundColor: Colors.dark.card,
    borderRadius: Radius.card,
    ...Shadows.card,
    borderWidth: 0.5,
    borderColor: Colors.neutral.border,
  },
  cardInner: {
    overflow: 'hidden',
    borderRadius: Radius.card,
  },
  bannerContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeTopRight: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
  },
  content: {
    padding: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  titleWrapper: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
  },
  organizer: {
    color: Colors.text.muted,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  infoCol: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 10,
    color: Colors.text.muted,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
  },
  progressSection: {
    marginBottom: Spacing.xl,
  },
  deadline: {
    marginTop: Spacing.xs,
    fontSize: 10,
    color: Colors.danger.main,
    textAlign: 'right',
  },
  footer: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.neutral.border,
    paddingTop: Spacing.md,
  },
  viewBtn: {
    backgroundColor: Colors.primary.glow,
    borderRadius: Radius.full,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  viewBtnText: {
    color: Colors.text.accent,
    fontWeight: '700',
  },
});

export default React.memo(TournamentListCard);
