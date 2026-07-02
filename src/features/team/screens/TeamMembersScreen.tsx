import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { useTeamData } from '../hooks/useTeamData';
import { teamService } from '../../../services/teamService';
import MemberAvatar from '../components/MemberAvatar';

const TeamMembersScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { getTeamMembers } = useTeamData();

  const teamId = route.params?.teamId;
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTeamMembers(teamId);
      setMembers(data);
    } catch (e) {
      console.error('Failed to fetch members', e);
    } finally {
      setLoading(false);
    }
  }, [teamId, getTeamMembers]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleMemberAction = (member: any) => {
    Alert.alert(
      'Manage Member',
      `What would you like to do with ${member.username || member.name || 'this member'}?`,
      [
        {
          text: 'Make Captain',
          onPress: async () => {
            try {
              await teamService.transferCaptain(teamId, member.id);
              Alert.alert('Success', 'Captain transferred successfully.');
              fetchMembers();
            } catch (e: any) {
              Alert.alert('Error', e?.response?.data?.message || 'Failed to transfer captain.');
            }
          }
        },
        {
          text: 'Kick from Team',
          onPress: async () => {
            try {
              await teamService.removeMember(teamId, member.id);
              Alert.alert('Success', 'Member removed.');
              fetchMembers();
            } catch (e: any) {
              Alert.alert('Error', e?.response?.data?.message || 'Failed to remove member.');
            }
          },
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      const isCaptain = item.role === 'captain' || item.isOwner;
      return (
        <View style={styles.memberRow}>
          <MemberAvatar
            url={item.avatarUrl || 'https://via.placeholder.com/150'}
            size={48}
            role={isCaptain ? 'captain' : 'player'}
          />
          <View style={styles.memberInfo}>
            <Subheading style={styles.memberName}>{item.username || item.name || 'Player'}</Subheading>
            <Label style={styles.memberRole}>
              {isCaptain ? 'Captain' : 'Player'}
            </Label>
          </View>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleMemberAction(item)}
          >
            <Icon name="dots-horizontal" size={24} color={Colors.text.muted} />
          </TouchableOpacity>
        </View>
      );
    },
    [teamId, handleMemberAction],
  );

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Team Members</Heading>
        <View style={styles.headerCountBadge}>
          <Label style={styles.headerCount}>{members.length}</Label>
        </View>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary.main} style={{ marginTop: Spacing.xxl }} />
        ) : (
          <FlashList
            data={members}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            estimatedItemSize={70}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.border,
    backgroundColor: Colors.dark.surface,
  },
  backBtn: {
    padding: Spacing.xs,
    marginRight: Spacing.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
  },
  headerCountBadge: {
    backgroundColor: Colors.dark.surfaceLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  headerCount: {
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  memberInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  memberName: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  memberRole: {
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 2,
  },
  actionBtn: {
    padding: Spacing.xs,
  },
});

export default TeamMembersScreen;
