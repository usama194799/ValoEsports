import React, {useCallback, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, RefreshControl} from 'react-native';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Team} from '../types/team';
import {useTeamData} from '../hooks/useTeamData';
import {ROUTES} from '../../../navigation/routes';
import {RootStackParamList} from '../../../navigation/types';

import TeamCard from '../components/TeamCard';
import EmptyState from '../../../components/EmptyState';
import {Heading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {Shadows} from '../../../theme/shadow';
import SkeletonTeamCard from '../components/SkeletonTeamCard';

type MyTeamsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyTeamsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MyTeamsNavigationProp>();
  const {teams} = useTeamData();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fabScale = useSharedValue(1);

  // Simulate network load on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const handleCreateTeam = useCallback(() => {
    navigation.navigate(ROUTES.CREATE_TEAM);
  }, [navigation]);

  const handleTeamPress = useCallback(
    (teamId: string) => {
      navigation.navigate(ROUTES.TEAM_DETAILS, {teamId});
    },
    [navigation],
  );

  const renderItem: ListRenderItem<Team> = useCallback(
    ({item, index}) => (
      <TeamCard
        team={item}
        index={index}
        onPress={() => handleTeamPress(item.id)}
      />
    ),
    [handleTeamPress],
  );

  const fabStyle = useAnimatedStyle(() => ({
    transform: [{scale: fabScale.value}],
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
      <View style={[styles.header, {paddingTop: insets.top || Spacing.md}]}>
        <Heading style={styles.headerTitle}>My Teams</Heading>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          renderSkeletons()
        ) : (
          <FlashList
            data={teams}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            estimatedItemSize={250}
            contentContainerStyle={styles.listContent}
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

      <Animated.View style={[styles.fabWrapper, fabStyle, Shadows.fab]}>
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.8}
          onPress={handleCreateTeam}>
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
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.border,
  },
  headerTitle: {
    fontSize: 24,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: 100, // Space for FAB
  },
  skeletonContainer: {
    padding: Spacing.lg,
  },
  fabWrapper: {
    position: 'absolute',
    bottom: Spacing.xxl,
    right: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.main,
  },
  fab: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(MyTeamsScreen);
