import React, { useCallback, useMemo, useState, useEffect } from 'react';
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
import { Heading, Label, Subheading } from '../../../components/Typography';

import ProgressStepper from '../components/ProgressStepper';
import ConfirmationCard from '../components/ConfirmationCard';
import {
  TermsAndConditionsSheet,
  TournamentRulesSheet,
} from '../components/BottomSheets';
import { tournamentService } from '../../../services/tournamentService';
import { teamService } from '../../../services/teamService';
import { registrationService } from '../../../services/registrationService';
import { Tournament } from '../../../types';
import { Team } from '../../team/types/team';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.REGISTRATION_CONFIRMATION
>['navigation'];
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.REGISTRATION_CONFIRMATION
>;

const RegistrationConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { tournamentId, teamId } = route.params;

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleConfirm = useCallback(async () => {
    if (!tournament) return;
    try {
      setSubmitting(true);
      await registrationService.registerForTournament(tournamentId, teamId);
      navigation.navigate(ROUTES.REGISTRATION_SUCCESS, {
        tournamentId: tournament.id,
        teamId,
      });
    } catch (error) {
      console.error('Failed to register', error);
      // Fallback: alert the user or let a global interceptor handle it
    } finally {
      setSubmitting(false);
    }
  }, [navigation, tournament, tournamentId, teamId]);

  if (loading || !team || !tournament) return null;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Confirmation</Heading>
        <View style={styles.placeholder} />
      </View>

      <ProgressStepper currentStep={4} totalSteps={4} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ConfirmationCard tournament={tournament} team={team} />

        <View style={styles.agreementsSection}>
          <Heading style={styles.sectionTitle}>Agreements</Heading>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => setShowRules(true)}
          >
            <Icon
              name="file-document-outline"
              size={20}
              color={Colors.primary.main}
            />
            <Subheading style={styles.linkText}>
              View Tournament Rules
            </Subheading>
            <Icon name="chevron-right" size={20} color={Colors.text.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => setShowTerms(true)}
          >
            <Icon
              name="text-box-outline"
              size={20}
              color={Colors.primary.main}
            />
            <Subheading style={styles.linkText}>
              View Terms & Conditions
            </Subheading>
            <Icon name="chevron-right" size={20} color={Colors.text.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            activeOpacity={0.8}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <View
              style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
            >
              {termsAccepted && (
                <Icon name="check" size={16} color={Colors.dark.background} />
              )}
            </View>
            <Label style={styles.checkboxLabel}>
              I have read and agree to the tournament rules and terms and
              conditions.
            </Label>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.primaryBtn, (!termsAccepted || submitting) && styles.btnDisabled]}
          activeOpacity={0.8}
          onPress={handleConfirm}
          disabled={!termsAccepted || submitting}
        >
          <Heading style={styles.btnText}>
            {submitting ? 'Processing...' : `Confirm & Pay ${tournament.entryFee || 'Free'}`}
          </Heading>
        </TouchableOpacity>
      </View>

      <TermsAndConditionsSheet
        visible={showTerms}
        onClose={() => setShowTerms(false)}
        content={(tournament as any).termsAndConditions || 'Terms and Conditions will be updated shortly.'}
      />
      <TournamentRulesSheet
        visible={showRules}
        onClose={() => setShowRules(false)}
        content={(tournament as any).fullRules || 'Tournament rules will be updated shortly.'}
      />
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
  agreementsSection: {
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: Spacing.md,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
  },
  linkText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Spacing.lg,
    paddingRight: Spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: Radius.sm,
    borderWidth: 2,
    borderColor: Colors.neutral.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
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

export default RegistrationConfirmationScreen;
