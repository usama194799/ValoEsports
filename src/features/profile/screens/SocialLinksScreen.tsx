import React, { useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Heading, Label } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { useProfileData } from '../hooks/useProfileData';
import SocialLinkRow from '../components/SocialLinkRow';

const SocialLinksScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { profile } = useProfileData();

  const renderEmptyState = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Icon
          name="link-variant-off"
          size={64}
          color={Colors.neutral.borderLight}
        />
        <Heading style={styles.emptyTitle}>No Social Links</Heading>
        <Label style={styles.emptySubtitle}>
          Connect your social accounts in settings.
        </Label>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Social Links</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!profile?.socialLinks || profile.socialLinks.length === 0
          ? renderEmptyState()
          : profile.socialLinks.map(link => (
              <SocialLinkRow key={link.id} social={link} />
            ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  backBtn: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl * 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.xxl * 2,
  },
  emptyTitle: {
    fontSize: 20,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    color: Colors.text.muted,
  },
});

export default SocialLinksScreen;
