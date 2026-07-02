import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  RootStackScreenProps,
  RootStackParamList,
} from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading } from '../../../components/Typography';

import SuccessCard from '../components/SuccessCard';
import { tournamentService } from '../../../services/tournamentService';
import { teamService } from '../../../services/teamService';
import { Tournament } from '../../../types';
import { Team } from '../../team/types/team';
import { ActivityIndicator } from 'react-native';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.REGISTRATION_SUCCESS
>['navigation'];
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.REGISTRATION_SUCCESS
>;

const RegistrationSuccessScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { tournamentId, teamId } = route.params;

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tournData, teamData] = await Promise.all([
          tournamentService.getTournamentById(tournamentId),
          teamService.getTeamById(teamId),
        ]);
        if (tournData) setTournament(tournData);
        if (teamData) setTeam(teamData as any);
      } catch (error) {
        console.error('Failed to load data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tournamentId, teamId]);

  const handleBackToDashboard = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      }),
    );
  }, [navigation]);

  const handleViewTournament = useCallback(() => {
    // Navigate to tournament details, removing the registration flow from the stack
    navigation.navigate(ROUTES.TOURNAMENT_DETAILS, {
      tournamentId: tournament?.id || tournamentId,
    });
  }, [navigation, tournament, tournamentId]);

  const handleShare = useCallback(() => {
    console.log('Share registration');
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary.main} />
        </View>
      </SafeAreaView>
    );
  }

  if (!team || !tournament) return null;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <SuccessCard tournament={tournament} team={team} />

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.8}
            onPress={handleViewTournament}
          >
            <Heading style={styles.btnText}>View Tournament</Heading>
          </TouchableOpacity>

          <View style={styles.secondaryActions}>
            <TouchableOpacity
              style={[
                styles.secondaryBtn,
                { flex: 1, marginRight: Spacing.sm },
              ]}
              activeOpacity={0.8}
              onPress={handleShare}
            >
              <Icon
                name="share-variant"
                size={20}
                color={Colors.text.primary}
                style={styles.btnIcon}
              />
              <Heading style={styles.secondaryBtnText}>Share</Heading>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryBtn, { flex: 1, marginLeft: Spacing.sm }]}
              activeOpacity={0.8}
              onPress={handleBackToDashboard}
            >
              <Icon
                name="home"
                size={20}
                color={Colors.text.primary}
                style={styles.btnIcon}
              />
              <Heading style={styles.secondaryBtnText}>Dashboard</Heading>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  actions: {
    marginTop: 40,
  },
  primaryBtn: {
    backgroundColor: Colors.primary.glow,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  btnText: {
    color: Colors.primary.main,
    fontSize: 16,
  },
  secondaryActions: {
    flexDirection: 'row',
  },
  secondaryBtn: {
    backgroundColor: Colors.dark.surface,
    height: 56,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  btnIcon: {
    marginRight: Spacing.sm,
  },
  secondaryBtnText: {
    color: Colors.text.primary,
    fontSize: 16,
  },
});

export default RegistrationSuccessScreen;
