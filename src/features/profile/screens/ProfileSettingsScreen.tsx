import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Switch} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {useAuth} from '../../auth/hooks/useAuth';

interface SettingRowProps {
  icon: string;
  title: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

const SettingRow: React.FC<SettingRowProps> = ({icon, title, value, onValueChange}) => (
  <View style={styles.settingRow}>
    <View style={styles.settingRowLeft}>
      <View style={styles.iconWrapper}>
        <Icon name={icon} size={20} color={Colors.text.primary} />
      </View>
      <Subheading style={styles.settingTitle}>{title}</Subheading>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{false: Colors.neutral.borderLight, true: Colors.primary.main}}
      thumbColor={Colors.neutral.white}
    />
  </View>
);

const ProfileSettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {logout} = useAuth();

  const [settings, setSettings] = useState({
    privateProfile: false,
    showStats: true,
    showTournamentHistory: true,
    allowTeamInvites: true,
    allowFriendRequests: true,
    pushNotifications: true,
    emailNotifications: false,
    darkMode: true,
  });

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({...prev, [key]: value}));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top || Spacing.md}]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Profile Settings</Heading>
        <View style={{width: 40}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Label style={styles.sectionHeader}>Privacy & Visibility</Label>
        <View style={styles.card}>
          <SettingRow
            icon="lock-outline"
            title="Private Profile"
            value={settings.privateProfile}
            onValueChange={v => updateSetting('privateProfile', v)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="chart-bar"
            title="Show Statistics"
            value={settings.showStats}
            onValueChange={v => updateSetting('showStats', v)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="trophy-outline"
            title="Show Tournament History"
            value={settings.showTournamentHistory}
            onValueChange={v => updateSetting('showTournamentHistory', v)}
          />
        </View>

        <Label style={styles.sectionHeader}>Interactions</Label>
        <View style={styles.card}>
          <SettingRow
            icon="account-group-outline"
            title="Allow Team Invites"
            value={settings.allowTeamInvites}
            onValueChange={v => updateSetting('allowTeamInvites', v)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="account-plus-outline"
            title="Allow Friend Requests"
            value={settings.allowFriendRequests}
            onValueChange={v => updateSetting('allowFriendRequests', v)}
          />
        </View>

        <Label style={styles.sectionHeader}>Notifications</Label>
        <View style={styles.card}>
          <SettingRow
            icon="bell-outline"
            title="Push Notifications"
            value={settings.pushNotifications}
            onValueChange={v => updateSetting('pushNotifications', v)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="email-outline"
            title="Email Notifications"
            value={settings.emailNotifications}
            onValueChange={v => updateSetting('emailNotifications', v)}
          />
        </View>

        <Label style={styles.sectionHeader}>App</Label>
        <View style={styles.card}>
          <SettingRow
            icon="moon-waning-crescent"
            title="Dark Mode"
            value={settings.darkMode}
            onValueChange={v => updateSetting('darkMode', v)}
          />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.7}>
          <Icon name="logout" size={24} color={Colors.danger.main} />
          <Heading style={styles.logoutText}>Log Out</Heading>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  backBtn: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl * 2,
  },
  sectionHeader: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: Colors.text.muted,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
    marginTop: Spacing.md,
  },
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginBottom: Spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  settingRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTitle: {
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.borderLight,
    marginLeft: 52 + Spacing.md, // iconWrapper + gap
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: Spacing.md,
    borderRadius: 12,
    marginTop: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
  },
  logoutText: {
    color: Colors.danger.main,
    fontSize: 16,
  },
});

export default ProfileSettingsScreen;
