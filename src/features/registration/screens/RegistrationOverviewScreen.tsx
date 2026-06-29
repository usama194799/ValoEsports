import React, { useCallback } from 'react';
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
import { Heading, Subheading, Label } from '../../../components/Typography';

import { REGISTRATION_TOURNAMENT_DETAILS } from '../constants/mockData';
import ProgressStepper from '../components/ProgressStepper';
import RegistrationCard from '../components/RegistrationCard';
import RequirementItem from '../components/RequirementItem';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.REGISTRATION_OVERVIEW
>['navigation'];

const RegistrationOverviewScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const tournament = REGISTRATION_TOURNAMENT_DETAILS;

  const handleContinue = useCallback(() => {
    navigation.navigate(ROUTES.SELECT_TEAM_REGISTRATION, {
      tournamentId: tournament.id,
    });
  }, [navigation, tournament.id]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Registration</Heading>
        <View style={styles.placeholder} />
      </View>

      <ProgressStepper currentStep={1} totalSteps={4} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <RegistrationCard tournament={tournament} />

        <View style={styles.section}>
          <Heading style={styles.sectionTitle}>Rules Summary</Heading>
          <View style={styles.rulesContainer}>
            {tournament.rulesSummary.map((rule, index) => (
              <View key={`rule_${index}`} style={styles.ruleItem}>
                <View style={styles.bullet} />
                <Subheading style={styles.ruleText}>{rule}</Subheading>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Heading style={styles.sectionTitle}>Tournament Requirements</Heading>
          <View style={styles.reqContainer}>
            {tournament.requirements.map(req => (
              <RequirementItem
                key={req.id}
                label={req.label}
                isMet={true} // Overview screen shows all requirements neutrally, but let's assume they are met visually for now, or we just pass isMet={true} to look good
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.8}
          onPress={handleContinue}
        >
          <Heading style={styles.btnText}>Continue Registration</Heading>
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
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: Spacing.md,
  },
  rulesContainer: {
    backgroundColor: Colors.dark.cardAlt,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary.main,
    marginTop: 8,
    marginRight: Spacing.md,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  reqContainer: {
    gap: Spacing.xs,
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
  btnText: {
    color: Colors.primary.main,
    fontSize: 16,
  },
});

export default RegistrationOverviewScreen;
