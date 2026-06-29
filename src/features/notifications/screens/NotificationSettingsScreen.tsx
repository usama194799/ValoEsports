import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Heading } from '../../../components/Typography';

import SettingsToggle from '../components/SettingsToggle';

const NotificationSettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const [settings, setSettings] = useState({
    pushEnabled: true,
    emailEnabled: false,
    sound: true,
    vibration: true,
    tournaments: true,
    matches: true,
    friendRequests: true,
    teamInvites: true,
    rewards: true,
    marketing: false,
    maintenance: true,
    security: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Heading style={styles.sectionTitle}>{title}</Heading>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Notification Settings</Heading>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderSectionHeader('Delivery Methods')}
        <View style={styles.card}>
          <SettingsToggle
            icon="bell-ring"
            title="Push Notifications"
            description="Receive alerts on your device"
            value={settings.pushEnabled}
            onValueChange={() => toggleSetting('pushEnabled')}
          />
          <SettingsToggle
            icon="email"
            title="Email Notifications"
            description="Receive daily summaries"
            value={settings.emailEnabled}
            onValueChange={() => toggleSetting('emailEnabled')}
          />
        </View>

        {renderSectionHeader('Device Preferences')}
        <View style={styles.card}>
          <SettingsToggle
            icon="volume-high"
            title="Sound"
            value={settings.sound}
            onValueChange={() => toggleSetting('sound')}
            disabled={!settings.pushEnabled}
          />
          <SettingsToggle
            icon="vibrate"
            title="Vibration"
            value={settings.vibration}
            onValueChange={() => toggleSetting('vibration')}
            disabled={!settings.pushEnabled}
          />
        </View>

        {renderSectionHeader('Alert Types')}
        <View style={styles.card}>
          <SettingsToggle
            icon="trophy"
            title="Tournaments"
            description="Registrations, brackets, updates"
            value={settings.tournaments}
            onValueChange={() => toggleSetting('tournaments')}
          />
          <SettingsToggle
            icon="sword-cross"
            title="Matches"
            description="Reminders, live scores, results"
            value={settings.matches}
            onValueChange={() => toggleSetting('matches')}
          />
          <SettingsToggle
            icon="account-plus"
            title="Friend Requests"
            value={settings.friendRequests}
            onValueChange={() => toggleSetting('friendRequests')}
          />
          <SettingsToggle
            icon="shield-account"
            title="Team Invitations"
            value={settings.teamInvites}
            onValueChange={() => toggleSetting('teamInvites')}
          />
          <SettingsToggle
            icon="gift"
            title="Rewards"
            description="Prize money, XP, drops"
            value={settings.rewards}
            onValueChange={() => toggleSetting('rewards')}
          />
        </View>

        {renderSectionHeader('System')}
        <View style={styles.card}>
          <SettingsToggle
            icon="bullhorn"
            title="Marketing & Offers"
            value={settings.marketing}
            onValueChange={() => toggleSetting('marketing')}
          />
          <SettingsToggle
            icon="server-network"
            title="Maintenance Alerts"
            value={settings.maintenance}
            onValueChange={() => toggleSetting('maintenance')}
          />
          <SettingsToggle
            icon="security"
            title="Security Alerts"
            description="Logins from new devices"
            value={settings.security}
            onValueChange={() => toggleSetting('security')}
            disabled={true} // Usually can't turn off security alerts
          />
        </View>
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  iconBtn: {
    padding: Spacing.sm,
  },
  appBarTitle: {
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  sectionHeader: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 14,
    color: Colors.text.muted,
  },
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
});

export default NotificationSettingsScreen;
