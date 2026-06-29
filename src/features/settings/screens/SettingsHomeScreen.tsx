import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackScreenProps } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

import SettingRow from '../components/SettingRow';
import { MOCK_USER_PROFILE } from '../constants/mockData';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.SETTINGS_HOME
>['navigation'];

const SettingsHomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Label style={styles.sectionTitle}>{title.toUpperCase()}</Label>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <Heading style={styles.appBarTitle}>Settings</Heading>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="magnify" size={20} color={Colors.text.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search settings..."
            placeholderTextColor={Colors.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={18} color={Colors.text.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Summary Card */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => navigation.navigate(ROUTES.ACCOUNT_SETTINGS)}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: MOCK_USER_PROFILE.avatar }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Heading style={styles.name}>
                {MOCK_USER_PROFILE.fullName}
              </Heading>
              {MOCK_USER_PROFILE.isVerified && (
                <Icon
                  name="check-decagram"
                  size={18}
                  color={Colors.gaming.open}
                  style={{ marginLeft: 4 }}
                />
              )}
            </View>
            <Subheading style={styles.username}>
              @{MOCK_USER_PROFILE.username}
            </Subheading>
            <View style={styles.levelBadge}>
              <Label style={styles.levelText}>
                Lvl {MOCK_USER_PROFILE.level}
              </Label>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={Colors.text.muted} />
        </TouchableOpacity>

        {renderSectionHeader('Account & Security')}
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="account-outline"
            title="Account Information"
            onPress={() => navigation.navigate(ROUTES.ACCOUNT_SETTINGS)}
          />
          <SettingRow
            icon="shield-check-outline"
            title="Security"
            onPress={() => navigation.navigate(ROUTES.SECURITY_SETTINGS)}
          />
          <SettingRow
            icon="lock-outline"
            title="Privacy"
            onPress={() => navigation.navigate(ROUTES.PRIVACY_SETTINGS)}
          />
          <SettingRow
            icon="wallet-outline"
            title="Wallet & Earnings"
            onPress={() => navigation.navigate(ROUTES.WALLET_DASHBOARD)}
          />
        </View>

        {renderSectionHeader('Preferences')}
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="bell-outline"
            title="Notifications"
            onPress={() =>
              navigation.navigate(ROUTES.NOTIFICATION_SETTINGS as any)
            }
          />
          <SettingRow
            icon="palette-swatch-outline"
            title="Appearance"
            onPress={() => navigation.navigate(ROUTES.APPEARANCE_SETTINGS)}
          />
          <SettingRow
            icon="translate"
            title="Language & Region"
            value="English (US)"
            onPress={() => navigation.navigate(ROUTES.LANGUAGE_REGION_SETTINGS)}
          />
        </View>

        {renderSectionHeader('Connections & Data')}
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="link-variant"
            title="Connected Accounts"
            onPress={() =>
              navigation.navigate(ROUTES.CONNECTED_ACCOUNTS_SETTINGS)
            }
          />
          <SettingRow
            icon="devices"
            title="Devices & Sessions"
            onPress={() =>
              navigation.navigate(ROUTES.DEVICES_SESSIONS_SETTINGS)
            }
          />
          <SettingRow
            icon="database-outline"
            title="Data & Storage"
            onPress={() => navigation.navigate(ROUTES.DATA_STORAGE_SETTINGS)}
          />
        </View>

        {renderSectionHeader('Support & About')}
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => navigation.navigate(ROUTES.HELP_SUPPORT_SETTINGS)}
          />
          <SettingRow
            icon="information-outline"
            title="About Application"
            onPress={() => navigation.navigate(ROUTES.ABOUT_SETTINGS)}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <Icon name="logout" size={20} color={Colors.gaming.live} />
          <Heading style={styles.logoutText}>Log Out</Heading>
        </TouchableOpacity>

        <Label style={styles.versionText}>App Version 1.0.0 (Build 42)</Label>
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
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.dark.surface,
  },
  iconBtn: {
    padding: Spacing.xs,
  },
  appBarTitle: {
    fontSize: 24,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.text.primary,
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: Spacing.md,
    backgroundColor: Colors.dark.cardAlt,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: Colors.text.primary,
  },
  username: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 2,
    marginBottom: 6,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent.transparent, // Accent with opacity
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  levelText: {
    color: Colors.primary.main,
    fontSize: 10,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 12,
    color: Colors.text.muted,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: Colors.dark.surface,
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.transparent.light,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.primary.transparent.dark,
  },
  logoutText: {
    color: Colors.gaming.live, // Error red
    fontSize: 16,
    marginLeft: Spacing.sm,
  },
  versionText: {
    textAlign: 'center',
    color: Colors.text.muted,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
    fontSize: 12,
  },
});

export default SettingsHomeScreen;
