import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { AppNotification } from '../constants/mockData';

interface NotificationCardProps {
  notification: AppNotification;
  onPress?: () => void;
  onActionPress?: () => void;
  onDelete?: () => void;
  onMarkRead?: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Tournament':
      return Colors.primary.main;
    case 'Matches':
      return Colors.danger.main;
    case 'Teams':
      return Colors.gaming.rankGold;
    case 'Friends':
      return '#3498db';
    case 'Rewards':
      return Colors.warning.main;
    case 'System':
      return Colors.text.muted;
    default:
      return Colors.primary.main;
  }
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
  onActionPress,
  onDelete,
  onMarkRead,
}) => {
  const iconColor = getCategoryColor(notification.category);
  const swipeableRef = useRef<SwipeableMethods>(null);

  const renderRightActions = (
    progress: SharedValue<number>,
    dragX: SharedValue<number>,
  ) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        dragX.value,
        [-100, 0],
        [1, 0.5],
        Extrapolation.CLAMP
      );
      return {
        transform: [{ scale }]
      };
    });

    return (
      <View style={styles.swipeActionsContainer}>
        {notification.isUnread && (
          <TouchableOpacity
            style={[
              styles.swipeAction,
              { backgroundColor: Colors.primary.main },
            ]}
            onPress={() => {
              swipeableRef.current?.close();
              onMarkRead?.();
            }}
          >
            <Animated.View style={animatedStyle}>
              <Icon name="check" size={24} color={Colors.dark.background} />
            </Animated.View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.swipeAction, { backgroundColor: Colors.danger.main }]}
          onPress={() => {
            swipeableRef.current?.close();
            onDelete?.();
          }}
        >
          <Animated.View style={animatedStyle}>
            <Icon name="delete" size={24} color={Colors.dark.background} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      friction={2}
    >
      <TouchableOpacity
        style={[styles.card, notification.isUnread && styles.unreadCard]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {notification.isUnread && <View style={styles.unreadDot} />}

        <View
          style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}
        >
          <Icon name={notification.iconName} size={24} color={iconColor} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Label style={[styles.categoryText, { color: iconColor }]}>
              {notification.category.toUpperCase()}
            </Label>
            <View style={styles.metaRow}>
              {notification.priority === 'High' && (
                <View style={styles.priorityBadge}>
                  <Icon
                    name="alert-circle"
                    size={10}
                    color={Colors.danger.main}
                  />
                  <Label style={styles.priorityText}>HIGH</Label>
                </View>
              )}
              <Label style={styles.timeText}>{notification.relativeTime}</Label>
            </View>
          </View>

          <Heading style={styles.title} numberOfLines={1}>
            {notification.title}
          </Heading>

          <Subheading style={styles.description} numberOfLines={2}>
            {notification.description}
          </Subheading>

          {notification.actionType && (
            <TouchableOpacity style={styles.actionBtn} onPress={onActionPress}>
              <Label style={styles.actionBtnText}>
                {notification.actionType.replace('_', ' ').toUpperCase()}
              </Label>
              <Icon
                name="chevron-right"
                size={16}
                color={Colors.primary.main}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: Spacing.lg,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  unreadCard: {
    backgroundColor: Colors.primary.transparent.light,
  },
  unreadDot: {
    position: 'absolute',
    top: Spacing.lg,
    left: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary.main,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    marginLeft: 4,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.danger.transparent.medium,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: Radius.xs,
    marginRight: Spacing.sm,
  },
  priorityText: {
    fontSize: 8,
    color: Colors.danger.main,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  timeText: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  title: {
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    alignSelf: 'flex-start',
  },
  actionBtnText: {
    fontSize: 12,
    color: Colors.primary.main,
    fontWeight: 'bold',
    marginRight: 4,
  },
  swipeActionsContainer: {
    flexDirection: 'row',
  },
  swipeAction: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationCard;
