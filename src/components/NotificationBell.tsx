import React, {useCallback} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../theme/colors';
import {Label} from './Typography';

interface NotificationBellProps {
  unreadCount?: number;
  onPress?: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  unreadCount = 2,
  onPress,
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.85, {damping: 10, stiffness: 200});
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSequence(
      withSpring(1.1, {damping: 10, stiffness: 200}),
      withSpring(1, {damping: 15, stiffness: 300}),
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={{color: 'rgba(255,255,255,0.1)', borderless: true}}
        style={styles.button}>
        <Icon name="bell-outline" size={20} color={Colors.text.primary} />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Label style={styles.badgeText}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </Label>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.neutral.border,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.danger.main,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: Colors.dark.card,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default React.memo(NotificationBell);
