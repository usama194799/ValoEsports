import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ROUTES} from '../navigation/routes';
import {Colors} from '../theme/colors';
import {Radius} from '../theme/radius';
import {Shadows} from '../theme/shadow';
import {Spacing} from '../theme/spacing';
import {AnimationConfig} from '../theme/animations';

interface TabItem {
  name: string;
  icon: string;
  iconLib: 'mci' | 'ion';
  label: string;
}

const TABS: TabItem[] = [
  {name: ROUTES.HOME_TAB, icon: 'home', iconLib: 'ion', label: 'Home'},
  {name: ROUTES.TOURNAMENTS_TAB, icon: 'sword-cross', iconLib: 'mci', label: 'Play'},
  {name: ROUTES.TEAMS_TAB, icon: 'shield-account', iconLib: 'mci', label: 'Teams'},
  {name: ROUTES.PROFILE_TAB, icon: 'person-outline', iconLib: 'ion', label: 'Profile'},
];

interface NavigationItemProps {
  item: TabItem;
  isActive: boolean;
  onPress: (name: string) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = React.memo(({item, isActive, onPress}) => {
  const color = isActive ? Colors.nav.active : Colors.nav.inactive;

  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => onPress(item.name)}
      activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        {item.iconLib === 'ion' ? (
          <Ionicons name={item.icon} size={22} color={color} />
        ) : (
          <Icon name={item.icon} size={22} color={color} />
        )}
      </View>
      <Text
        style={[
          styles.tabLabel,
          {color},
        ]}>
        {item.label}
      </Text>
      {isActive && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
});

const BottomTabBar: React.FC<BottomTabBarProps> = ({state, navigation}) => {
  const insets = useSafeAreaInsets();
  const fabScale = useSharedValue(1);
  const translateY = useSharedValue(100);

  useEffect(() => {
    translateY.value = withDelay(400, withSpring(0, {damping: 14, stiffness: 90}));
  }, [translateY]);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const fabStyle = useAnimatedStyle(() => ({
    transform: [{scale: fabScale.value}],
  }));

  const activeRouteName = state.routes[state.index].name;

  const handleTabPress = useCallback(
    (routeName: string) => {
      if (routeName === ROUTES.LEADERBOARD_TAB) {
        fabScale.value = withSequence(
          withSpring(0.88, AnimationConfig.spring.snappy),
          withSpring(1, AnimationConfig.spring.bouncy),
        );
      }
      navigation.navigate(routeName);
    },
    [fabScale, navigation],
  );

  return (
    <Animated.View
      style={[
        styles.container,
        slideStyle,
        {paddingBottom: insets.bottom > 0 ? insets.bottom : Spacing.md},
      ]}>
      {/* Left side tabs */}
      {TABS.slice(0, 2).map(tab => (
        <NavigationItem
          key={tab.name}
          item={tab}
          isActive={activeRouteName === tab.name}
          onPress={handleTabPress}
        />
      ))}

      {/* Center FAB */}
      <View style={styles.fabWrapper}>
        <Animated.View style={[styles.fabOuter, Shadows.fab, fabStyle]}>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => handleTabPress(ROUTES.LEADERBOARD_TAB)}
            activeOpacity={0.85}>
            <Icon name="chart-bar" size={26} color={Colors.text.primary} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Right side tabs */}
      {TABS.slice(2).map(tab => (
        <NavigationItem
          key={tab.name}
          item={tab}
          isActive={activeRouteName === tab.name}
          onPress={handleTabPress}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.nav.bg,
    borderTopWidth: 0.5,
    borderTopColor: Colors.nav.border,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
    minHeight: 56,
    position: 'relative',
  },
  iconContainer: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '500',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.nav.active,
    position: 'absolute',
    bottom: 4,
  },
  fabWrapper: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  fabOuter: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(BottomTabBar);
