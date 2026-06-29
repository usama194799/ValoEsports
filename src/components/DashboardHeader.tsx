import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  Extrapolation,
  interpolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlayerAvatar from './PlayerAvatar';
import NotificationBell from './NotificationBell';
import { Heading, Label } from './Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Shadows } from '../theme/shadow';
import { Spacing } from '../theme/spacing';

interface DashboardHeaderProps {
  username: string;
  role: string;
  avatarUri: string;
  onSettingsPress?: () => void;
  scrollY?: SharedValue<number>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  username,
  role,
  avatarUri,
  onSettingsPress,
  scrollY,
}) => {
  const insets = useSafeAreaInsets();

  const headerStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};

    const bgColor = interpolateColor(
      scrollY.value,
      [0, 100],
      ['transparent', Colors.dark.background],
    );

    const elevation = interpolate(
      scrollY.value,
      [0, 100],
      [0, 8],
      Extrapolation.CLAMP,
    );

    return {
      backgroundColor: bgColor,
      elevation: elevation,
      shadowOpacity: elevation > 0 ? 0.3 : 0,
    };
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { paddingTop: insets.top + Spacing.sm },
        headerStyle,
      ]}
    >
      <View style={[styles.container, Shadows.header]}>
        {/* Left: Avatar + User Info */}
        <View style={styles.leftSection}>
          <PlayerAvatar
            uri={avatarUri}
            size={40}
            borderWidth={2}
            borderColor={Colors.primary.main}
          />
          <View style={styles.userInfo}>
            <Heading style={styles.username}>{username}</Heading>
            <Label style={styles.role}>{role}</Label>
          </View>
        </View>

        {/* Right: Actions */}
        <View style={styles.rightSection}>
          <NotificationBell unreadCount={2} onPress={() => {}} />
          <TouchableOpacity
            onPress={onSettingsPress}
            activeOpacity={0.75}
            style={styles.settingsBtn}
          >
            <Icon name="cog-outline" size={20} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.card,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderWidth: 0.5,
    borderColor: Colors.neutral.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  userInfo: {
    gap: 1,
  },
  username: {
    letterSpacing: 1.2,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  role: {
    color: Colors.text.muted,
    fontSize: 11,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.neutral.border,
  },
});

export default React.memo(DashboardHeader);
