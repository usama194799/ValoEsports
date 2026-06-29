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

const PrivacyScreen: React.FC = () => {
  const navigation = useNavigation();
  const [showMatchHistory, setShowMatchHistory] = useState(true);
  const [showTeamHistory, setShowTeamHistory] = useState(true);
  const [showTournamentHistory, setShowTournamentHistory] = useState(true);
  const [allowFriendRequests, setAllowFriendRequests] = useState(true);
  const [allowDirectMessages, setAllowDirectMessages] = useState(true);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Privacy Settings</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>PROFILE VISIBILITY</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="eye-outline"
            title="Profile Visibility"
            value="Public"
            onPress={() => console.log('Profile visibility')}
          />
          <SettingRow
            icon="circle-medium"
            title="Online Status"
            value="Online"
            onPress={() => console.log('Online status')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>GAMEPLAY HISTORY</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingToggle
            icon="history"
            title="Show Match History"
            description="Allow others to see your past matches"
            value={showMatchHistory}
            onValueChange={setShowMatchHistory}
          />
          <SettingToggle
            icon="account-group-outline"
            title="Show Team History"
            description="Display the teams you've played for"
            value={showTeamHistory}
            onValueChange={setShowTeamHistory}
          />
          <SettingToggle
            icon="trophy-outline"
            title="Show Tournament History"
            description="Display your past tournaments and results"
            value={showTournamentHistory}
            onValueChange={setShowTournamentHistory}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>COMMUNICATIONS</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingToggle
            icon="account-plus-outline"
            title="Friend Requests"
            description="Allow users to send you friend requests"
            value={allowFriendRequests}
            onValueChange={setAllowFriendRequests}
          />
          <SettingToggle
            icon="message-text-outline"
            title="Direct Messages"
            description="Allow direct messages from non-friends"
            value={allowDirectMessages}
            onValueChange={setAllowDirectMessages}
          />
          <SettingRow
            icon="block-helper"
            title="Block List"
            subtitle="0 users blocked"
            onPress={() => console.log('Block List')}
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

export default PrivacyScreen;
