import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { useTeamData } from '../hooks/useTeamData';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

import TeamBanner from '../components/TeamBanner';
import {
  SectionContainer,
  CardContainer,
} from '../../tournament-details/components/LayoutContainers';
import MemberAvatar from '../components/MemberAvatar';
import SkeletonDetails from '../../tournament-details/components/SkeletonDetails';

type TeamDetailsRouteProp = any;
type TeamDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TeamDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<TeamDetailsRouteProp>();
  const navigation = useNavigation<TeamDetailsNavigationProp>();
  const { getTeamById, getTeamStats, getTeamMembers } = useTeamData();

  const teamId = route.params?.teamId;
  const [team, setTeam] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teamData, statsData, membersData] = await Promise.all([
          getTeamById(teamId),
          getTeamStats(teamId),
          getTeamMembers(teamId)
        ]);
        setTeam(teamData);
        setStats(statsData);
        setMembers(membersData);
      } catch (e) {
        console.error('Failed to load team details', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [teamId]);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleEditPress = useCallback(() => {
    navigation.navigate(ROUTES.EDIT_TEAM, { teamId });
  }, [navigation, teamId]);

  const handleInvitePress = useCallback(() => {
    navigation.navigate(ROUTES.INVITE_PLAYERS, { teamId });
  }, [navigation, teamId]);

  const handleMembersPress = useCallback(() => {
    navigation.navigate(ROUTES.TEAM_MEMBERS, { teamId });
  }, [navigation, teamId]);

  const handleSettingsPress = useCallback(() => {
    navigation.navigate(ROUTES.TEAM_SETTINGS, { teamId });
  }, [navigation, teamId]);

  if (loading || !team) {
    return (
      <View style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
         <ActivityIndicator size="large" color={Colors.primary.main} />
      </View>
    );
  }

  const captain = members.find(m => m.role === 'captain' || m.isOwner) || members[0];

  return (
    <View style={styles.root}>
      {/* Absolute Back Button */}
      <View style={[styles.headerOverlay, { top: insets.top || Spacing.md }]}>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.8}
          onPress={handleSettingsPress}
        >
          <Icon name="cog-outline" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xl }}
      >
        <TeamBanner
          bannerUrl={team.bannerUrl}
          logoUrl={team.logoUrl}
          teamName={team.name}
          game={team.game}
          scrollY={scrollY}
        />

        <View style={styles.content}>
          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleInvitePress}
            >
              <Icon
                name="account-plus-outline"
                size={20}
                color={Colors.primary.main}
              />
              <Label style={styles.actionText}>Invite</Label>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={handleEditPress}>
              <Icon
                name="pencil-outline"
                size={20}
                color={Colors.primary.main}
              />
              <Label style={styles.actionText}>Edit</Label>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <Icon name="share-variant" size={20} color={Colors.primary.main} />
              <Label style={styles.actionText}>Share</Label>
            </TouchableOpacity>
          </View>

          {/* About Section */}
          <SectionContainer title="About">
            <CardContainer>
              <Subheading style={styles.description}>
                {team.description || 'No description provided.'}
              </Subheading>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Icon
                    name="earth"
                    size={16}
                    color={Colors.text.secondary}
                    style={styles.metaIcon}
                  />
                  <Label style={styles.metaLabel}>{team.region || 'Global'}</Label>
                </View>
                <View style={styles.metaItem}>
                  <Icon
                    name="clock-outline"
                    size={16}
                    color={Colors.text.secondary}
                    style={styles.metaIcon}
                  />
                  <Label style={styles.metaLabel}>Est. 2024</Label>
                </View>
              </View>
            </CardContainer>
          </SectionContainer>

          {/* Captain Section */}
          {captain && (
            <SectionContainer title="Captain">
              <CardContainer style={styles.captainCard}>
                <View style={styles.captainInfo}>
                  <MemberAvatar
                    url={captain.avatarUrl || 'https://via.placeholder.com/150'}
                    size={48}
                    role="captain"
                  />
                  <View style={styles.captainText}>
                    <Subheading>{captain.username || captain.name || 'Captain'}</Subheading>
                    <Label style={styles.captainLabel}>Team Leader</Label>
                  </View>
                </View>
                <TouchableOpacity style={styles.viewProfileBtn}>
                  <Label style={styles.viewProfileLabel}>Profile</Label>
                </TouchableOpacity>
              </CardContainer>
            </SectionContainer>
          )}

          {/* Roster Preview */}
          <SectionContainer
            title={`Roster (${members.length})`}
            headerRight={
              <TouchableOpacity onPress={handleMembersPress}>
                <Label style={{ color: Colors.primary.main }}>View All</Label>
              </TouchableOpacity>
            }
          >
            <CardContainer style={styles.rosterCard}>
              <View style={styles.rosterList}>
                {members.slice(0, 5).map((m, idx) => (
                  <View key={m.id || idx} style={styles.rosterItem}>
                    <MemberAvatar
                      url={m.avatarUrl || 'https://via.placeholder.com/150'}
                      size={40}
                      role={m.role === 'captain' || m.isOwner ? 'captain' : 'player'}
                    />
                    <Label
                      style={styles.rosterName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {m.username || m.name || `Player ${idx+1}`}
                    </Label>
                  </View>
                ))}
              </View>
            </CardContainer>
          </SectionContainer>

          {/* Statistics */}
          {stats && (
            <SectionContainer title="Team Statistics">
              <View style={styles.statsGrid}>
                <CardContainer style={styles.statBox}>
                  <Heading style={styles.statValue}>
                    {stats.tournamentsPlayed || 0}
                  </Heading>
                  <Label style={styles.statLabel}>Tournaments</Label>
                </CardContainer>
                <CardContainer style={styles.statBox}>
                  <Heading style={styles.statValue}>{stats.winRate || 0}%</Heading>
                  <Label style={styles.statLabel}>Win Rate</Label>
                </CardContainer>
                <CardContainer style={styles.statBox}>
                  <Heading style={styles.statValue}>
                    {stats.tournamentsWon || 0}
                  </Heading>
                  <Label style={styles.statLabel}>Trophies</Label>
                </CardContainer>
                <CardContainer style={styles.statBox}>
                  <Heading style={styles.statValue}>
                    ${stats.totalEarnings || 0}
                  </Heading>
                  <Label style={styles.statLabel}>Earnings</Label>
                </CardContainer>
              </View>
            </SectionContainer>
          )}

          {/* Recent Achievements / History */}
          <SectionContainer title="Recent Matches">
            {team.achievements && team.achievements.length > 0 ? (
              team.achievements.map((ach: any) => (
                <CardContainer key={ach.id} style={styles.achievementCard}>
                  <View style={styles.achInfo}>
                    <Subheading>{ach.tournamentName}</Subheading>
                    <Label style={styles.achDate}>{ach.date}</Label>
                  </View>
                  <View style={styles.achResult}>
                    <Heading
                      style={[
                        styles.placement,
                        ach.placement === 1 && { color: Colors.gaming.rankGold },
                      ]}
                    >
                      #{ach.placement}
                    </Heading>
                    <Label style={styles.achPrize}>{ach.prize}</Label>
                  </View>
                </CardContainer>
              ))
            ) : (
              <CardContainer style={styles.emptyCard}>
                <Label style={styles.emptyText}>No recent matches to display.</Label>
              </CardContainer>
            )}
          </SectionContainer>
        </View>
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
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    gap: Spacing.xl,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary.glow,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 75, 75, 0.2)',
  },
  actionText: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  description: {
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaIcon: {},
  metaLabel: {
    color: Colors.text.secondary,
  },
  captainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  captainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  captainText: {},
  captainLabel: {
    color: Colors.text.muted,
    fontSize: 12,
  },
  viewProfileBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.dark.surfaceLight,
  },
  viewProfileLabel: {
    color: Colors.text.primary,
    fontSize: 12,
  },
  rosterCard: {
    padding: Spacing.md,
  },
  rosterList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rosterItem: {
    alignItems: 'center',
    gap: Spacing.xs,
    width: 60,
  },
  rosterName: {
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  statBox: {
    width: '48%',
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    color: Colors.text.primary,
  },
  statLabel: {
    color: Colors.text.muted,
    fontSize: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  achInfo: {
    gap: 4,
  },
  achDate: {
    color: Colors.text.muted,
    fontSize: 12,
  },
  achResult: {
    alignItems: 'flex-end',
    gap: 4,
  },
  placement: {
    fontSize: 20,
    color: Colors.text.primary,
  },
  achPrize: {
    color: Colors.text.success,
    fontWeight: 'bold',
  },
  emptyCard: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.text.muted,
  },
});

export default TeamDetailsScreen;
