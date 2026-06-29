import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

import SettingRow from '../components/SettingRow';

const AboutScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>About</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          <View style={styles.logoBox}>
            <Icon
              name="gamepad-variant"
              size={48}
              color={Colors.neutral.white}
            />
          </View>
          <Heading style={styles.appName}>Esports Arena</Heading>
          <Subheading style={styles.versionText}>
            Version 1.0.0 (Build 42)
          </Subheading>
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>INFORMATION</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="update"
            title="Release Notes"
            subtitle="See what's new in this version"
            onPress={() => console.log('Release Notes')}
          />
          <SettingRow
            icon="star-outline"
            title="Rate on App Store"
            onPress={() => console.log('Rate App')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>LEGAL</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="certificate-outline"
            title="Licenses"
            onPress={() => console.log('Licenses')}
          />
          <SettingRow
            icon="code-tags"
            title="Open Source Credits"
            onPress={() => console.log('OS Credits')}
          />
        </View>

        <Label style={styles.copyrightText}>
          © 2026 Esports Arena Inc.{'\n'}All rights reserved.
        </Label>
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
  heroContainer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: Colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    shadowColor: Colors.primary.glow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  appName: {
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  versionText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.md,
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
  copyrightText: {
    textAlign: 'center',
    marginTop: Spacing.xxl,
    color: Colors.text.muted,
    lineHeight: 18,
    fontSize: 12,
  },
});

export default AboutScreen;
