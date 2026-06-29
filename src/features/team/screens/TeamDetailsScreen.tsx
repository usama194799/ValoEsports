import React, {useCallback, useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RootStackParamList} from '../../../navigation/types';
import {ROUTES} from '../../../navigation/routes';
import {useTeamData} from '../hooks/useTeamData';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {Radius} from '../../../theme/radius';
import {Heading, Label, Subheading} from '../../../components/Typography';

import TeamBanner from '../components/TeamBanner';
import {SectionContainer, CardContainer} from '../../tournament-details/components/LayoutContainers';
import MemberAvatar from '../components/MemberAvatar';

type TeamDetailsRouteProp = any;
type TeamDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TeamDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<TeamDetailsRouteProp>();
  const navigation = useNavigation<TeamDetailsNavigationProp>();
  const {getTeamById, getTeamStats, getTeamMembers} = useTeamData();
  
  const teamId = route.params?.teamId;
  const team = getTeamById(teamId);
  const stats = getTeamStats(teamId);
  const members = getTeamMembers(teamId);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleEditPress = useCallback(() => {
    navigation.navigate(ROUTES.EDIT_TEAM, {teamId});
  }, [navigation, teamId]);

  const handleInvitePress = useCallback(() => {
    navigation.navigate(ROUTES.INVITE_PLAYERS, {teamId});
  }, [navigation, teamId]);

  const handleMembersPress = useCallback(() => {
    navigation.navigate(ROUTES.TEAM_MEMBERS, {teamId});
  }, [navigation, teamId]);

  const handleSettingsPress = useCallback(() => {
    navigation.navigate(ROUTES.TEAM_SETTINGS, {teamId});
  }, [navigation, teamId]);

  if (!team) return null;

  const captain = members.find(m => m.role === 'captain');

  return (
    <View style={styles.root}>
      {/* Absolute Back Button */}
      <View style={[styles.headerOverlay, {top: insets.top || Spacing.md}]}>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.8}
          onPress={handleSettingsPress}>
          <Icon name="cog-outline" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: insets.bottom + Spacing.xl}}>
        
        <TeamBanner
          bannerUrl={team.bannerUrl}
          logoUrl={team.logoUrl}
          teamName={team.name}
          game={team.game}
          scrollY={scrollY}
        />

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtnPrimary} onPress={handleInvitePress}>
            <Icon name="account-plus-outline" size={20} color={Colors.primary.main} />
            <Label style={styles.actionTextPrimary}>Invite</Label>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnSecondary} onPress={handleEditPress}>
            <Icon name="pencil-outline" size={20} color={Colors.text.primary} />
            <Label style={styles.actionTextSecondary}>Edit Team</Label>
          </TouchableOpacity>
        </View>

        <SectionContainer title="About">
          <CardContainer>
            <Label style={styles.description}>{team.description}</Label>
            <View style={styles.divider} />
            
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Label style={styles.infoLabel}>Country</Label>
                <Subheading style={styles.infoValue}>{team.country}</Subheading>
              </View>
              <View style={styles.infoItem}>
                <Label style={styles.infoLabel}>Region</Label>
                <Subheading style={styles.infoValue}>{team.region}</Subheading>
              </View>
              <View style={styles.infoItem}>
                <Label style={styles.infoLabel}>Rank</Label>
                <Subheading style={[styles.infoValue, {color: Colors.gaming.rankGold}]}>
                  #{team.rank}
                </Subheading>
              </View>
              <View style={styles.infoItem}>
                <Label style={styles.infoLabel}>Level</Label>
                <Subheading style={styles.infoValue}>{team.level}</Subheading>
              </View>
            </View>
          </CardContainer>
        </SectionContainer>

        <SectionContainer
          title="Members"
          headerRight={
            <TouchableOpacity onPress={handleMembersPress}>
              <Label style={styles.viewAllText}>View All ({members.length})</Label>
            </TouchableOpacity>
          }>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.membersScroll}>
            {members.slice(0, 5).map(member => (
              <View key={member.id} style={styles.memberBox}>
                <MemberAvatar url={member.avatarUrl} size={56} online={member.online} role={member.role} />
                <Label style={styles.memberName} numberOfLines={1}>{member.name}</Label>
              </View>
            ))}
          </ScrollView>
        </SectionContainer>

        <SectionContainer title="Statistics">
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Icon name="sword-cross" size={24} color={Colors.primary.main} />
              <Heading style={styles.statValue}>{stats.totalMatches}</Heading>
              <Label style={styles.statLabel}>Matches</Label>
            </View>
            <View style={styles.statCard}>
              <Icon name="percent" size={24} color={Colors.gaming.winRate} />
              <Heading style={[styles.statValue, {color: Colors.gaming.winRate}]}>
                {stats.winRate}%
              </Heading>
              <Label style={styles.statLabel}>Win Rate</Label>
            </View>
            <View style={styles.statCard}>
              <Icon name="target" size={24} color={Colors.gaming.rankSilver} />
              <Heading style={styles.statValue}>{stats.averageScore}</Heading>
              <Label style={styles.statLabel}>Avg Score</Label>
            </View>
          </View>
        </SectionContainer>

      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  headerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  actionBtnPrimary: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.glow,
    borderRadius: Radius.md,
    gap: Spacing.sm,
  },
  actionTextPrimary: {
    color: Colors.primary.main,
    fontWeight: '700',
  },
  actionBtnSecondary: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    gap: Spacing.sm,
  },
  actionTextSecondary: {
    fontWeight: '600',
  },
  description: {
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.borderLight,
    marginVertical: Spacing.lg,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.lg,
  },
  infoItem: {
    width: '45%',
  },
  infoLabel: {
    color: Colors.text.muted,
    fontSize: 11,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
  },
  viewAllText: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  membersScroll: {
    gap: Spacing.lg,
  },
  memberBox: {
    alignItems: 'center',
    width: 64,
  },
  memberName: {
    fontSize: 11,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
  },
  statValue: {
    fontSize: 20,
    marginTop: Spacing.sm,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.text.muted,
  },
});

export default React.memo(TeamDetailsScreen);
