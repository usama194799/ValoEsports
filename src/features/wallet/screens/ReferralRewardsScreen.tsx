import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

import { MOCK_REFERRAL_DATA } from '../constants/mockData';

const ReferralRewardsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on the ultimate Esports platform! Use my referral code ${MOCK_REFERRAL_DATA.code} to get a sign-up bonus!`,
      });
    } catch (error) {
      console.log('Error sharing', error);
    }
  };

  const renderStatBox = (
    title: string,
    value: string | number,
    icon: string,
    color: string,
  ) => (
    <View style={styles.statBox}>
      <Icon name={icon} size={24} color={color} style={styles.statIcon} />
      <Heading style={styles.statValue}>{value}</Heading>
      <Label style={styles.statLabel}>{title}</Label>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Invite Friends</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Icon name="gift-open" size={64} color={Colors.primary.main} />
          <Heading style={styles.heroTitle}>Invite & Earn</Heading>
          <Subheading style={styles.heroDescription}>
            Invite your friends to play tournaments. You both get PKR 250 when
            they complete their first match!
          </Subheading>
        </View>

        {/* Code Container */}
        <View style={styles.codeContainer}>
          <Label style={styles.codeLabel}>YOUR REFERRAL CODE</Label>
          <View style={styles.codeRow}>
            <Heading style={styles.codeText}>{MOCK_REFERRAL_DATA.code}</Heading>
            <TouchableOpacity style={styles.copyBtn} activeOpacity={0.8}>
              <Icon name="content-copy" size={20} color={Colors.primary.main} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.shareBtn}
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <Icon name="share-variant" size={20} color={Colors.dark.background} />
          <Heading style={styles.shareBtnText}>Share Invite Link</Heading>
        </TouchableOpacity>

        {/* Stats */}
        <Heading style={styles.sectionTitle}>Your Earnings</Heading>
        <View style={styles.statsContainer}>
          {renderStatBox(
            'Total Earned',
            `PKR ${MOCK_REFERRAL_DATA.totalEarnings}`,
            'cash-multiple',
            Colors.gaming.open,
          )}
          {renderStatBox(
            'Pending',
            `PKR ${MOCK_REFERRAL_DATA.pendingRewards}`,
            'clock-outline',
            Colors.gaming.rankGold,
          )}
          {renderStatBox(
            'Friends Joined',
            MOCK_REFERRAL_DATA.totalReferrals,
            'account-group',
            Colors.primary.main,
          )}
        </View>

        {/* How it works */}
        <Heading style={styles.sectionTitle}>How it works</Heading>
        <View style={styles.stepsContainer}>
          <View style={styles.stepRow}>
            <View style={styles.stepCircle}>
              <Heading style={styles.stepNumber}>1</Heading>
            </View>
            <View style={styles.stepTextContainer}>
              <Heading style={styles.stepTitle}>Share your code</Heading>
              <Subheading style={styles.stepDesc}>
                Send your unique code to your gaming friends.
              </Subheading>
            </View>
          </View>
          <View style={styles.stepLine} />

          <View style={styles.stepRow}>
            <View style={styles.stepCircle}>
              <Heading style={styles.stepNumber}>2</Heading>
            </View>
            <View style={styles.stepTextContainer}>
              <Heading style={styles.stepTitle}>Friends Sign Up</Heading>
              <Subheading style={styles.stepDesc}>
                They register using your code and get a welcome bonus.
              </Subheading>
            </View>
          </View>
          <View style={styles.stepLine} />

          <View style={styles.stepRow}>
            <View style={styles.stepCircle}>
              <Heading style={styles.stepNumber}>3</Heading>
            </View>
            <View style={styles.stepTextContainer}>
              <Heading style={styles.stepTitle}>Play & Earn</Heading>
              <Subheading style={styles.stepDesc}>
                Once they complete a match, you receive your reward instantly!
              </Subheading>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.dark.surface,
  },
  iconBtn: {
    padding: Spacing.sm,
  },
  appBarTitle: {
    fontSize: 18,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  heroContainer: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  heroTitle: {
    fontSize: 24,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  heroDescription: {
    textAlign: 'center',
    color: Colors.text.secondary,
    lineHeight: 22,
    paddingHorizontal: Spacing.xl,
  },
  codeContainer: {
    backgroundColor: Colors.dark.surface,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    borderStyle: 'dashed',
    marginBottom: Spacing.lg,
  },
  codeLabel: {
    textAlign: 'center',
    color: Colors.text.muted,
    marginBottom: Spacing.sm,
    letterSpacing: 1,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    fontSize: 32,
    color: Colors.primary.main,
    letterSpacing: 2,
    marginRight: Spacing.md,
  },
  copyBtn: {
    padding: Spacing.sm,
    backgroundColor: Colors.primary.transparent.light,
    borderRadius: Radius.md,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.main,
    paddingVertical: 16,
    borderRadius: Radius.lg,
    marginBottom: Spacing.xxl,
  },
  shareBtnText: {
    color: Colors.dark.background,
    fontSize: 16,
    marginLeft: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: Spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxl,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  statIcon: {
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: 16,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  stepsContainer: {
    backgroundColor: Colors.dark.surface,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary.transparent.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    marginTop: 2,
  },
  stepNumber: {
    color: Colors.primary.main,
    fontSize: 14,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    marginBottom: Spacing.xs,
  },
  stepDesc: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  stepLine: {
    width: 2,
    height: 30,
    backgroundColor: Colors.neutral.borderLight,
    marginLeft: 15,
    marginVertical: 4,
  },
});

export default ReferralRewardsScreen;
