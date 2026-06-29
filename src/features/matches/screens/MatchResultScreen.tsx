import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
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
import { Heading, Label, Subheading } from '../../../components/Typography';

import { MOCK_RESULT, MOCK_MATCHES } from '../constants/mockData';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.MATCH_RESULT
>['navigation'];
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.MATCH_RESULT
>;

const MatchResultScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { matchId } = route.params;

  const match = MOCK_MATCHES.find(m => m.id === matchId) || MOCK_MATCHES[2];
  const result = MOCK_RESULT;

  const handleReturnHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      }),
    );
  };

  const handleViewBracket = () => {
    navigation.navigate(ROUTES.TOURNAMENT_BRACKET, {
      tournamentId: 'tourney_1',
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Match Result</Heading>
        <TouchableOpacity style={styles.shareBtn}>
          <Icon name="share-variant" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.winnerCard}>
          <View style={styles.winnerBadge}>
            <Icon name="trophy" size={16} color={Colors.gaming.rankGold} />
            <Label style={styles.winnerText}>WINNER</Label>
          </View>

          <Image
            source={{ uri: result.winner.logoUrl }}
            style={styles.winnerLogo}
          />
          <Heading style={styles.winnerName}>{result.winner.name}</Heading>

          <View style={styles.scoreBadge}>
            <Heading style={styles.scoreText}>{result.finalScore}</Heading>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Heading style={styles.statValue}>{result.prizeEarned}</Heading>
            <Label style={styles.statLabel}>Prize Earned</Label>
          </View>
          <View style={styles.statBox}>
            <Heading style={[styles.statValue, { color: Colors.warning.main }]}>
              {result.xpEarned}
            </Heading>
            <Label style={styles.statLabel}>XP Earned</Label>
          </View>
        </View>

        <View style={styles.mvpCard}>
          <Heading style={styles.mvpTitle}>Match MVP</Heading>
          <View style={styles.mvpInfo}>
            <Image
              source={{ uri: result.mvp.avatar }}
              style={styles.mvpAvatar}
            />
            <View style={styles.mvpDetails}>
              <View style={styles.mvpNameRow}>
                <Subheading style={styles.mvpName}>
                  {result.mvp.name}
                </Subheading>
                <Icon
                  name="check-decagram"
                  size={16}
                  color={Colors.primary.main}
                />
              </View>
              <Label style={styles.mvpKills}>{result.mvp.kills} Kills</Label>
            </View>
            <Icon name="star" size={24} color={Colors.gaming.rankGold} />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleViewBracket}
          activeOpacity={0.8}
        >
          <Heading style={styles.btnText}>View Bracket</Heading>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={handleReturnHome}
          activeOpacity={0.8}
        >
          <Heading style={styles.secondaryBtnText}>Return to Home</Heading>
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  backBtn: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
  },
  shareBtn: {
    padding: Spacing.sm,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  winnerCard: {
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xxl,
    borderWidth: 1,
    borderColor: Colors.gaming.rankGold,
    marginBottom: Spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  winnerBadge: {
    position: 'absolute',
    top: 0,
    backgroundColor: Colors.warning.transparent.light,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderBottomLeftRadius: Radius.md,
    borderBottomRightRadius: Radius.md,
  },
  winnerText: {
    color: Colors.gaming.rankGold,
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 12,
  },
  winnerLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.dark.background,
    borderWidth: 2,
    borderColor: Colors.gaming.rankGold,
    marginTop: Spacing.md,
  },
  winnerName: {
    fontSize: 24,
    color: Colors.text.primary,
    marginTop: Spacing.lg,
  },
  scoreBadge: {
    backgroundColor: Colors.dark.cardAlt,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  scoreText: {
    fontSize: 24,
    letterSpacing: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginHorizontal: Spacing.xs,
  },
  statValue: {
    fontSize: 20,
    color: Colors.gaming.rankGold,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    color: Colors.text.muted,
    fontSize: 12,
  },
  mvpCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  mvpTitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
  },
  mvpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mvpAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  mvpDetails: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  mvpNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  mvpName: {
    fontSize: 16,
    marginRight: 4,
  },
  mvpKills: {
    color: Colors.text.muted,
  },
  footer: {
    padding: Spacing.xl,
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
  secondaryBtn: {
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  secondaryBtnText: {
    color: Colors.text.primary,
    fontSize: 16,
  },
});

export default MatchResultScreen;
