import React from 'react';
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
import { Heading, Label } from '../../../components/Typography';

import SettingRow from '../components/SettingRow';

const LanguageRegionScreen: React.FC = () => {
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
        <Heading style={styles.appBarTitle}>Language & Region</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>LOCALE SETTINGS</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="translate"
            title="App Language"
            value="English (US)"
            onPress={() => console.log('Change language')}
          />
          <SettingRow
            icon="map-marker-outline"
            title="Country / Region"
            value="Pakistan"
            onPress={() => console.log('Change country')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label style={styles.sectionTitle}>DATE & TIME</Label>
        </View>
        <View style={styles.sectionContainer}>
          <SettingRow
            icon="clock-time-four-outline"
            title="Timezone"
            value="GMT+5"
            onPress={() => console.log('Change timezone')}
          />
          <SettingRow
            icon="calendar-blank-outline"
            title="Date Format"
            value="DD/MM/YYYY"
            onPress={() => console.log('Change date format')}
          />
          <SettingRow
            icon="clock-outline"
            title="Time Format"
            value="12-hour"
            onPress={() => console.log('Change time format')}
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

export default LanguageRegionScreen;
