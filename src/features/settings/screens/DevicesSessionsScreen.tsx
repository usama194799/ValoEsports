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

import DeviceCard from '../components/DeviceCard';
import { MOCK_DEVICES } from '../constants/mockData';

const DevicesSessionsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [devices, setDevices] = useState(MOCK_DEVICES);

  const handleSignOut = (id: string) => {
    // Mock sign out
    setDevices(prev => prev.filter(d => d.id !== id));
  };

  const handleSignOutAll = () => {
    // Keep only the current device
    setDevices(prev => prev.filter(d => d.isCurrent));
  };

  const currentDevice = devices.find(d => d.isCurrent);
  const otherDevices = devices.filter(d => !d.isCurrent);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Devices & Sessions</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerTextContainer}>
          <Label style={styles.headerDesc}>
            These are the devices that have logged into your account. Review
            them regularly to ensure your account is secure.
          </Label>
        </View>

        {currentDevice && (
          <>
            <View style={styles.sectionHeader}>
              <Label style={styles.sectionTitle}>CURRENT DEVICE</Label>
            </View>
            <View style={styles.sectionContainer}>
              <DeviceCard session={currentDevice} />
            </View>
          </>
        )}

        <View style={styles.sectionHeaderRow}>
          <Label style={styles.sectionTitle}>OTHER DEVICES</Label>
          {otherDevices.length > 0 && (
            <TouchableOpacity onPress={handleSignOutAll}>
              <Label style={styles.signOutAllText}>Sign Out All</Label>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.sectionContainer}>
          {otherDevices.length > 0 ? (
            otherDevices.map((device, index) => (
              <View
                key={device.id}
                style={
                  index === otherDevices.length - 1 ? styles.lastItem : null
                }
              >
                <DeviceCard
                  session={device}
                  onSignOut={() => handleSignOut(device.id)}
                />
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="shield-check" size={48} color={Colors.text.muted} />
              <Subheading style={styles.emptyTitle}>
                No other active sessions
              </Subheading>
            </View>
          )}
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
  headerTextContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerDesc: {
    color: Colors.text.secondary,
    lineHeight: 20,
    fontSize: 14,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  signOutAllText: {
    color: Colors.gaming.live,
    fontSize: 12,
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
  lastItem: {
    borderBottomWidth: 0,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyTitle: {
    color: Colors.text.secondary,
    marginTop: Spacing.md,
  },
});

export default DevicesSessionsScreen;
