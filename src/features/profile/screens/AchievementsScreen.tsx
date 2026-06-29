import React, {useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity, RefreshControl} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Heading, Label} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {useProfileData} from '../hooks/useProfileData';
import AchievementCard from '../components/AchievementCard';

const AchievementsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {profile, isRefreshing, refresh} = useProfileData();

  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Icon name="trophy-broken" size={64} color={Colors.neutral.borderLight} />
      <Heading style={styles.emptyTitle}>No Achievements</Heading>
      <Label style={styles.emptySubtitle}>Complete challenges to unlock achievements.</Label>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top || Spacing.md}]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Achievements</Heading>
        <View style={{width: 40}} />
      </View>

      <FlashList
        data={profile?.achievements || []}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <AchievementCard achievement={item} />}
        estimatedItemSize={160}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={Colors.primary.main}
          />
        }
      />
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
  listContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl * 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.xxl * 2,
    // When using numColumns, the empty component takes the width of a single column by default unless styled
    width: '100%', 
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

export default AchievementsScreen;
