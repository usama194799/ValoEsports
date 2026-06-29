import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  RootStackScreenProps,
  RootStackParamList,
} from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

import ProgressStepper from '../components/ProgressStepper';
import TeamCard from '../../team/components/TeamCard';
import {
  MOCK_ELIGIBLE_TEAMS,
  MOCK_INELIGIBLE_TEAMS,
} from '../constants/mockData';
import { Team } from '../../team/types/team';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.SELECT_TEAM_REGISTRATION
>['navigation'];
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.SELECT_TEAM_REGISTRATION
>;

const SelectTeamScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { tournamentId } = route.params;

  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setTeams([...MOCK_ELIGIBLE_TEAMS, ...MOCK_INELIGIBLE_TEAMS]);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreateTeam = useCallback(() => {
    navigation.navigate(ROUTES.QUICK_CREATE_TEAM, { tournamentId });
  }, [navigation, tournamentId]);

  const handleSelectTeam = useCallback(
    (team: Team) => {
      navigation.navigate(ROUTES.TEAM_VERIFICATION, {
        tournamentId,
        teamId: team.id,
      });
    },
    [navigation, tournamentId],
  );

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Heading style={styles.sectionTitle}>Select a Team</Heading>
      <Label style={styles.sectionSubtitle}>
        Choose a team to register for the tournament.
      </Label>

      <TouchableOpacity
        style={styles.createBtn}
        onPress={handleCreateTeam}
        activeOpacity={0.8}
      >
        <Icon
          name="plus-circle-outline"
          size={20}
          color={Colors.primary.main}
        />
        <Heading style={styles.createBtnText}>Create New Team</Heading>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Icon
          name="account-group-outline"
          size={48}
          color={Colors.text.muted}
        />
        <Heading style={styles.emptyTitle}>No Teams Found</Heading>
        <Label style={styles.emptyText}>
          You are not a captain of any team yet.
        </Label>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Select Team</Heading>
        <View style={styles.placeholder} />
      </View>

      <ProgressStepper currentStep={2} totalSteps={4} />

      <View style={{ flex: 1 }}>
        <FlashList
          data={teams}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TeamCard
              team={item}
              index={index}
              onPress={() => handleSelectTeam(item)}
            />
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={120}
        />
      </View>
    </SafeAreaView>
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
    paddingVertical: Spacing.md,
  },
  backBtn: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
  },
  placeholder: {
    width: 32,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  listHeader: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    color: Colors.text.muted,
    marginBottom: Spacing.lg,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.transparent.light,
    borderWidth: 1,
    borderColor: Colors.primary.main,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderStyle: 'dashed',
    gap: Spacing.sm,
  },
  createBtnText: {
    color: Colors.primary.main,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    color: Colors.text.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptyText: {
    color: Colors.text.muted,
  },
});

export default SelectTeamScreen;
