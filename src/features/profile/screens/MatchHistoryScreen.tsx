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
import MatchCard from '../components/MatchCard';

const MatchHistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {profile, isRefreshing, refresh} = useProfileData();

  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Icon name="history" size={64} color={Colors.neutral.borderLight} />
      <Heading style={styles.emptyTitle}>No Matches Yet</Heading>
      <Label style={styles.emptySubtitle}>Play your first match to see history here.</Label>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top || Spacing.md}]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Match History</Heading>
        <View style={{width: 40}} />
      </View>

      <FlashList
        data={profile?.recentMatches || []}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <MatchCard match={item} />}
        estimatedItemSize={120}
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

export default MatchHistoryScreen;
