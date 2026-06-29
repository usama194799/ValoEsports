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

const DataStorageScreen: React.FC = () => {
  const navigation = useNavigation();
  const [autoDownload, setAutoDownload] = useState(true);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Data & Storage</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>STORAGE</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="database-outline"
            title="App Storage Usage"
            value="142 MB"
            onPress={() => console.log('Storage info')}
          />
          <SettingRow
            icon="broom"
            title="Clear Cache"
            subtitle="Free up space by clearing temporary files"
            value="38 MB"
            onPress={() => console.log('Clear cache')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>MEDIA DOWNLOADS</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="image-outline"
            title="Image Quality"
            subtitle="Quality of loaded tournament banners"
            value="High"
            onPress={() => console.log('Image quality')}
          />
          <SettingToggle
            icon="download-network-outline"
            title="Auto-Download Media"
            description="Download assets automatically on Wi-Fi"
            value={autoDownload}
            onValueChange={setAutoDownload}
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

export default DataStorageScreen;
