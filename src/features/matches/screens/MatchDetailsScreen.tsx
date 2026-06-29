import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
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

import { MOCK_MATCH_DETAILS, MOCK_MATCHES } from '../constants/mockData';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.MATCH_DETAILS_MODAL
>['navigation'];
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.MATCH_DETAILS_MODAL
>;

const MatchDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { matchId } = route.params;

  const match = MOCK_MATCHES.find(m => m.id === matchId) || MOCK_MATCHES[0];
  const details = MOCK_MATCH_DETAILS;

  const renderInfoRow = (label: string, value: string) => (
    <View style={styles.infoRow}>
      <Label style={styles.infoLabel}>{label}</Label>
      <Subheading style={styles.infoValue}>{value}</Subheading>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Match Details</Heading>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroBanner}>
          <Image
            source={{ uri: match.tournamentBanner }}
            style={styles.heroImg}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Heading style={styles.heroTournament}>
              {match.tournamentName}
            </Heading>
            <Label style={styles.heroMeta}>
              {match.round} • {match.bestOf}
            </Label>
          </View>
        </View>

        <View style={styles.matchupBox}>
          <View style={styles.teamBox}>
            <Image
              source={{ uri: match.teamA.logoUrl }}
              style={styles.teamLogo}
            />
            <Heading style={styles.teamTag}>{match.teamA.tag}</Heading>
            <Label style={styles.captainText}>C: {details.captainA}</Label>
          </View>
          <View style={styles.vsBox}>
            <Heading style={styles.vsText}>VS</Heading>
            <Label style={styles.timeText}>{match.matchTime}</Label>
          </View>
          <View style={styles.teamBox}>
            <Image
              source={{ uri: match.teamB.logoUrl }}
              style={styles.teamLogo}
            />
            <Heading style={styles.teamTag}>{match.teamB.tag}</Heading>
            <Label style={styles.captainText}>C: {details.captainB}</Label>
          </View>
        </View>

        <View style={styles.section}>
          <Heading style={styles.sectionTitle}>Match Info</Heading>
          <View style={styles.card}>
            {renderInfoRow('Server Region', details.serverRegion)}
            {renderInfoRow('Map Pool', details.mapPool.join(', '))}
            {renderInfoRow('Referee', details.referee)}
            {renderInfoRow('Ruleset', details.rules)}
          </View>
        </View>

        <View style={styles.section}>
          <Heading style={styles.sectionTitle}>Match Timeline</Heading>
          <View style={styles.card}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Label style={styles.timelineTime}>18:00 UTC</Label>
                <Subheading style={styles.timelineEvent}>
                  Match Scheduled
                </Subheading>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDotLine} />
              <View style={styles.timelineContent}>
                <Label style={styles.timelineTime}>TBD</Label>
                <Subheading style={styles.timelineEvent}>
                  Server Allocation
                </Subheading>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
          <Icon
            name="cloud-upload-outline"
            size={20}
            color={Colors.text.primary}
          />
          <Heading style={styles.uploadBtnText}>Upload Result</Heading>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
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
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  heroBanner: {
    height: 120,
    width: '100%',
    position: 'relative',
  },
  heroImg: {
    ...(StyleSheet.absoluteFill as any),
  },
  heroOverlay: {
    ...(StyleSheet.absoluteFill as any),
    backgroundColor: Colors.neutral.blackTransparent.heavy,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTournament: {
    fontSize: 20,
    color: Colors.text.primary,
  },
  heroMeta: {
    color: Colors.primary.main,
    marginTop: 4,
  },
  matchupBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.xl,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.border,
  },
  teamBox: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginBottom: Spacing.sm,
  },
  teamTag: {
    fontSize: 16,
  },
  captainText: {
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 2,
  },
  vsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  vsText: {
    fontSize: 20,
    color: Colors.text.muted,
    marginBottom: Spacing.xs,
  },
  timeText: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.neutral.border,
  },
  infoLabel: {
    color: Colors.text.muted,
  },
  infoValue: {
    color: Colors.text.primary,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary.main,
    marginTop: 4,
    marginRight: Spacing.md,
  },
  timelineDotLine: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.neutral.borderLight,
    borderWidth: 2,
    borderColor: Colors.dark.surface,
    marginTop: 4,
    marginRight: Spacing.md,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTime: {
    fontSize: 11,
    color: Colors.text.muted,
    marginBottom: 2,
  },
  timelineEvent: {
    color: Colors.text.secondary,
  },
  uploadBtn: {
    margin: Spacing.lg,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    borderRadius: Radius.lg,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  uploadBtnText: {
    marginLeft: Spacing.sm,
    color: Colors.text.primary,
    fontSize: 16,
  },
});

export default MatchDetailsScreen;
