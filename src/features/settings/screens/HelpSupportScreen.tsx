import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label } from '../../../components/Typography';

import SettingRow from '../components/SettingRow';

const HelpSupportScreen: React.FC = () => {
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
        <Heading style={styles.appBarTitle}>Help & Support</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>GET IN TOUCH</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="frequently-asked-questions"
            title="FAQ"
            subtitle="Browse common questions and answers"
            onPress={() => console.log('FAQ')}
          />
          <SettingRow
            icon="headset"
            title="Contact Support"
            subtitle="Get help from our support team"
            onPress={() => console.log('Contact Support')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>FEEDBACK</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="bug-outline"
            title="Report a Bug"
            onPress={() => console.log('Report Bug')}
          />
          <SettingRow
            icon="lightbulb-on-outline"
            title="Feature Request"
            onPress={() => console.log('Feature Request')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>LEGAL & POLICIES</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="gavel"
            title="Community Guidelines"
            onPress={() => console.log('Community Guidelines')}
          />
          <SettingRow
            icon="file-document-outline"
            title="Terms of Service"
            onPress={() => console.log('TOS')}
          />
          <SettingRow
            icon="shield-account-outline"
            title="Privacy Policy"
            onPress={() => console.log('Privacy Policy')}
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

export default HelpSupportScreen;
