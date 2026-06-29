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

const AppearanceScreen: React.FC = () => {
  const navigation = useNavigation();
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Appearance</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>THEME</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="theme-light-dark"
            title="App Theme"
            value="Dark Mode"
            onPress={() => console.log('Change theme')}
          />
          <SettingRow
            icon="palette-outline"
            title="Accent Color"
            value="Esports Red"
            onPress={() => console.log('Change accent')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>TYPOGRAPHY</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="format-size"
            title="Font Size"
            value="Medium"
            onPress={() => console.log('Change font size')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>DISPLAY</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingToggle
            icon="view-compact-outline"
            title="Compact Mode"
            description="Reduce spacing and padding across the app"
            value={compactMode}
            onValueChange={setCompactMode}
          />
          <SettingToggle
            icon="animation-play-outline"
            title="Enable Animations"
            description="Toggle UI animations and transitions"
            value={animationsEnabled}
            onValueChange={setAnimationsEnabled}
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

export default AppearanceScreen;
