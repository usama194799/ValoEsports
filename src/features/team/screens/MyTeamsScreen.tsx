import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Team } from '../types/team';
import { useTeamData } from '../hooks/useTeamData';
import { ROUTES } from '../../../navigation/routes';
import { RootStackParamList } from '../../../navigation/types';

import TeamCard from '../components/TeamCard';
import EmptyState from '../../../components/EmptyState';
import { Heading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Shadows } from '../../../theme/shadow';
import SkeletonTeamCard from '../components/SkeletonTeamCard';

type MyTeamsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyTeamsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MyTeamsNavigationProp>();
  const { getMyTeams } = useTeamData();
  
  const [teams, setTeams] = useState<Team[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fabScale = useSharedValue(1);

  const fetchTeams = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const data = await getMyTeams();
      setTeams(data);
    } catch (e) {
      console.error('Failed to load teams', e);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  }, [getMyTeams]);

  useFocusEffect(
    useCallback(() => {
      fetchTeams();
    }, [fetchTeams])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTeams(true);
  }, [fetchTeams]);

  const handleCreateTeam = useCallback(() => {
    navigation.navigate(ROUTES.CREATE_TEAM);
  }, [navigation]);

  const handleTeamPress = useCallback(
    (teamId: string) => {
      navigation.navigate(ROUTES.TEAM_DETAILS, { teamId });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<Team> = useCallback(
    ({ item, index }) => (
      <TeamCard
        team={item}
        index={index}
        onPress={() => handleTeamPress(item.id)}
      />
    ),
    [handleTeamPress],
  );

  const fabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <EmptyState
        icon="shield-account-outline"
        title="No Teams Yet"
        message="You haven't joined or created any teams. Create a team or get invited to start competing!"
      />
    );
  };

  const renderSkeletons = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map(key => (
        <SkeletonTeamCard key={key} />
      ))}
    </View>
  );

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <Heading style={styles.headerTitle}>My Teams</Heading>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => navigation.navigate(ROUTES.JOIN_TEAM)}
        >
          <Icon name="magnify" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {loading && !refreshing ? (
          renderSkeletons()
        ) : (
          <FlashList
            data={teams}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            estimatedItemSize={120}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmpty}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primary.main}
                colors={[Colors.primary.main]}
              />
            }
          />
        )}
      </View>

      {/* Floating Action Button */}
      <Animated.View
        style={[
          styles.fabContainer,
          { bottom: insets.bottom + 90 }, // space for bottom tab + padding
          fabStyle,
        ]}
      >
        <TouchableOpacity
          style={[styles.fab, Shadows.card]}
          activeOpacity={0.8}
          onPress={handleCreateTeam}
        >
          <Icon name="plus" size={28} color={Colors.text.primary} />
        </TouchableOpacity>
      </Animated.View>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.border,
  },
  headerTitle: {
    fontSize: 24,
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: 100, // accommodate bottom tab & FAB
  },
  skeletonContainer: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  fabContainer: {
    position: 'absolute',
    right: Spacing.lg,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyTeamsScreen;
