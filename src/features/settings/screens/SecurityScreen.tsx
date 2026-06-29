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
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

import SettingRow from '../components/SettingRow';
import SettingToggle from '../components/SettingToggle';
import { MOCK_DEVICES } from '../constants/mockData';

const SecurityScreen: React.FC = () => {
  const navigation = useNavigation();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Security</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Security Alert Mock */}
        {!twoFactorEnabled && (
          <View style={styles.alertCard}>
            <View style={styles.alertIcon}>
              <Icon
                name="shield-alert"
                size={24}
                color={Colors.gaming.rankGold}
              />
            </View>
            <View style={styles.alertTextContainer}>
              <Heading style={styles.alertTitle}>Protect Your Account</Heading>
              <Subheading style={styles.alertDesc}>
                Enable Two-Factor Authentication to add an extra layer of
                security to your account.
              </Subheading>
            </View>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>LOGIN SETTINGS</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="key-outline"
            title="Change Password"
            subtitle="Last changed 3 months ago"
            onPress={() => console.log('Change password')}
          />
          <SettingToggle
            icon="cellphone-key"
            title="Two-Factor Authentication"
            description="Use an authenticator app or SMS"
            value={twoFactorEnabled}
            onValueChange={setTwoFactorEnabled}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>DEVICES & ACTIVITY</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="format-list-bulleted"
            title="Login Activity"
            subtitle="View your recent login history"
            onPress={() => console.log('Login activity')}
          />
          <SettingRow
            icon="shield-check-outline"
            title="Trusted Devices"
            subtitle={`${MOCK_DEVICES.length} devices currently logged in`}
            onPress={() =>
              navigation.navigate('DevicesSessionsSettings' as any)
            }
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
  },
  iconBtn: {
    padding: Spacing.sm,
  },
  appBarTitle: {
    fontSize: 18,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: Colors.warning.transparent.medium, // Gold with opacity
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.gaming.rankGold,
  },
  alertIcon: {
    marginRight: Spacing.md,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    color: Colors.gaming.rankGold,
    fontSize: 15,
    marginBottom: Spacing.xs,
  },
  alertDesc: {
    color: Colors.text.secondary,
    fontSize: 13,
    lineHeight: 18,
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
});

export default SecurityScreen;
