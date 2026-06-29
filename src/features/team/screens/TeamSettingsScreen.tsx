import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { ROUTES } from '../../../navigation/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

const TeamSettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();

  const teamId = route.params?.teamId;

  const handleDisband = useCallback(() => {
    Alert.alert(
      'Disband Team',
      'Are you sure you want to disband this team? This action cannot be undone and all data will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disband',
          style: 'destructive',
          onPress: () => navigation.navigate(ROUTES.MY_TEAMS as any),
        },
      ],
    );
  }, [navigation]);

  const handleLeave = useCallback(() => {
    Alert.alert('Leave Team', 'Are you sure you want to leave this team?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Leave',
        style: 'destructive',
        onPress: () => navigation.navigate(ROUTES.MY_TEAMS as any),
      },
    ]);
  }, [navigation]);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Team Settings</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Label style={styles.sectionTitle}>Management</Label>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                navigation.navigate(ROUTES.TEAM_REQUESTS, { teamId })
              }
            >
              <View style={styles.rowIcon}>
                <Icon
                  name="inbox-outline"
                  size={22}
                  color={Colors.text.primary}
                />
              </View>
              <Subheading style={styles.rowText}>Join Requests</Subheading>
              <View style={styles.badge}>
                <Label style={styles.badgeText}>2</Label>
              </View>
              <Icon name="chevron-right" size={24} color={Colors.text.muted} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate(ROUTES.EDIT_TEAM, { teamId })}
            >
              <View style={styles.rowIcon}>
                <Icon
                  name="pencil-outline"
                  size={22}
                  color={Colors.text.primary}
                />
              </View>
              <Subheading style={styles.rowText}>Edit Team Profile</Subheading>
              <Icon name="chevron-right" size={24} color={Colors.text.muted} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                navigation.navigate(ROUTES.TEAM_MEMBERS, { teamId })
              }
            >
              <View style={styles.rowIcon}>
                <Icon
                  name="account-group-outline"
                  size={22}
                  color={Colors.text.primary}
                />
              </View>
              <Subheading style={styles.rowText}>Manage Members</Subheading>
              <Icon name="chevron-right" size={24} color={Colors.text.muted} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Label style={styles.sectionTitle}>Danger Zone</Label>
          <View style={styles.card}>
            <TouchableOpacity style={styles.row} onPress={handleLeave}>
              <View style={styles.rowIcon}>
                <Icon name="exit-run" size={22} color={Colors.danger.main} />
              </View>
              <Subheading
                style={[styles.rowText, { color: Colors.danger.main }]}
              >
                Leave Team
              </Subheading>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.row} onPress={handleDisband}>
              <View style={styles.rowIcon}>
                <Icon
                  name="delete-outline"
                  size={22}
                  color={Colors.danger.main}
                />
              </View>
              <Subheading
                style={[styles.rowText, { color: Colors.danger.main }]}
              >
                Disband Team
              </Subheading>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: Colors.text.muted,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.sm,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    minHeight: 56,
  },
  rowIcon: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  rowText: {
    flex: 1,
    fontSize: 16,
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.neutral.borderLight,
    marginLeft: 56,
  },
  badge: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
    marginRight: Spacing.sm,
  },
  badgeText: {
    color: Colors.text.primary,
    fontWeight: '700',
    fontSize: 12,
  },
});

export default TeamSettingsScreen;
