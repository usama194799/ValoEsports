import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';

import ProfileBanner from '../components/ProfileBanner';
import { useProfileData } from '../hooks/useProfileData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { profile, isLoading, isRefreshing, refresh, error } = useProfileData();

  if (isLoading && !profile) {
    return (
      <View style={[styles.container, styles.centerAll]}>
        <ActivityIndicator color={Colors.primary.main} size="large" />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={[styles.container, styles.centerAll]}>
        <Label style={{ color: Colors.danger.main }}>
          {error || 'Failed to load profile'}
        </Label>
      </View>
    );
  }

  const sections = [
    {
      id: 'stats',
      title: 'Player Statistics',
      icon: 'chart-bar',
      route: ROUTES.PLAYER_STATISTICS,
    },
    {
      id: 'history',
      title: 'Match History',
      icon: 'history',
      route: ROUTES.MATCH_HISTORY,
    },
    {
      id: 'achievements',
      title: 'Achievements',
      icon: 'trophy',
      route: ROUTES.ACHIEVEMENTS,
    },
    {
      id: 'social',
      title: 'Social Links',
      icon: 'link-variant',
      route: ROUTES.SOCIAL_LINKS,
    },
    {
      id: 'settings',
      title: 'Profile Settings',
      icon: 'cog',
      route: ROUTES.PROFILE_SETTINGS,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={Colors.primary.main}
          />
        }
      >
        <ProfileBanner
          fullName={profile.fullName}
          username={profile.username}
          avatarUrl={profile.avatarUrl}
          coverUrl={profile.coverUrl}
          level={profile.level}
          isVerified={profile.isVerified}
          country={profile.country}
          currentRank={profile.currentRank}
          bio={profile.bio}
          style={{ paddingTop: insets.top }}
        />

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.editBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}
          >
            <Icon name="pencil" size={20} color="#FFF" />
            <Label style={styles.editBtnText}>Edit Profile</Label>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareBtn} activeOpacity={0.7}>
            <Icon name="share-variant" size={20} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.menuItem,
                index === sections.length - 1 && styles.lastMenuItem,
              ]}
              onPress={() => navigation.navigate(section.route as any)}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconWrapper}>
                <Icon
                  name={section.icon}
                  size={24}
                  color={Colors.primary.main}
                />
              </View>
              <Subheading style={styles.menuTitle}>{section.title}</Subheading>
              <Icon name="chevron-right" size={24} color={Colors.text.muted} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  centerAll: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  editBtn: {
    flex: 1,
    backgroundColor: Colors.primary.main,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: Radius.md,
    gap: Spacing.sm,
  },
  editBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  shareBtn: {
    width: 48,
    height: 48,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  menuContainer: {
    paddingHorizontal: Spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: Radius.round,
    backgroundColor: Colors.primary.glow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
  },
});

export default MyProfileScreen;
