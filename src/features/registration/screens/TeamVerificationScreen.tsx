import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
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
import { Heading, Label } from '../../../components/Typography';

import ProgressStepper from '../components/ProgressStepper';
import RequirementItem from '../components/RequirementItem';
import { teamService } from '../../../services/teamService';
import { Team } from '../../team/types/team';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.TEAM_VERIFICATION
>['navigation'];
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.TEAM_VERIFICATION
>;

const TeamVerificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { tournamentId, teamId } = route.params;

  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamService.getTeamById(teamId);
        if (data) setTeam(data as any);
      } catch (error) {
        console.error('Failed to fetch team', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [teamId]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleProceed = useCallback(() => {
    navigation.navigate(ROUTES.REGISTRATION_CONFIRMATION, {
      tournamentId,
      teamId,
    });
  }, [navigation, tournamentId, teamId]);

  if (!team) return null;

  // Mock verification logic based on dummy data
  const checks = [
    {
      id: 'c1',
      label: 'Minimum 5 Members',
      isMet: team.membersCount >= 5,
      errorDetail: `Current: ${team.membersCount}. Need at least 5.`,
    },
    {
      id: 'c2',
      label: 'Required Rank: Ascendant 1+',
      isMet: team.rank <= 100, // Just a dummy condition
      errorDetail: 'Some players do not meet the minimum rank requirement.',
    },
    {
      id: 'c3',
      label: 'Account Status: No Bans',
      isMet: true,
      errorDetail: '',
    },
    {
      id: 'c4',
      label: 'Player Eligibility: Region Match',
      isMet: team.region === 'NA',
      errorDetail: 'Team region must be NA.',
    },
  ];

  const allPassed = checks.every(c => c.isMet);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Verification</Heading>
        <View style={styles.placeholder} />
      </View>

      <ProgressStepper currentStep={3} totalSteps={4} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Heading style={styles.sectionTitle}>Verifying {team.name}</Heading>
          <Label style={styles.sectionSubtitle}>
            Checking your team against tournament requirements.
          </Label>
        </View>

        <View style={styles.checksContainer}>
          {checks.map(check => (
            <RequirementItem
              key={check.id}
              label={check.label}
              isMet={check.isMet}
              errorDetail={check.errorDetail}
            />
          ))}
        </View>

        {!allPassed && (
          <View style={styles.warningBox}>
            <Icon name="alert" size={20} color={Colors.danger.main} />
            <Label style={styles.warningText}>
              Your team does not meet all requirements. Please resolve the
              issues before continuing.
            </Label>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.primaryBtn, !allPassed && styles.btnDisabled]}
          activeOpacity={0.8}
          onPress={handleProceed}
          disabled={!allPassed}
        >
          <Heading style={styles.btnText}>Proceed to Confirmation</Heading>
        </TouchableOpacity>
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
  titleSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    color: Colors.text.muted,
  },
  checksContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: Colors.danger.transparent.medium,
    padding: Spacing.md,
    borderRadius: Radius.md,
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  warningText: {
    flex: 1,
    color: Colors.danger.main,
    lineHeight: 20,
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.border,
  },
  primaryBtn: {
    backgroundColor: Colors.primary.glow,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    backgroundColor: Colors.dark.cardAlt,
    opacity: 0.5,
  },
  btnText: {
    color: Colors.primary.main,
    fontSize: 16,
  },
});

export default TeamVerificationScreen;
