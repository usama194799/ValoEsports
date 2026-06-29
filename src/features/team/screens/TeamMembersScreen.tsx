import React, { useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { useTeamData } from '../hooks/useTeamData';
import MemberAvatar from '../components/MemberAvatar';

const TeamMembersScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { getTeamMembers } = useTeamData();

  const teamId = route.params?.teamId;
  const members = getTeamMembers(teamId);

  const handleMemberAction = (member: any) => {
    Alert.alert(
      'Manage Member',
      `What would you like to do with ${member.name}?`,
      [
        { text: 'Promote to Co-Leader', onPress: () => console.log('Promote') },
        {
          text: 'Kick from Team',
          onPress: () => console.log('Kick'),
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <View style={styles.memberRow}>
        <MemberAvatar
          url={item.avatarUrl}
          size={48}
          online={item.online}
          role={item.role}
        />
        <View style={styles.memberInfo}>
          <Subheading style={styles.memberName}>{item.name}</Subheading>
          <Label style={styles.memberRole}>
            {item.role === 'captain'
              ? 'Captain'
              : item.role === 'co-leader'
              ? 'Co-Leader'
              : 'Player'}
            {' • '}
            Level {item.level}
          </Label>
        </View>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => handleMemberAction(item)}
        >
          <Icon name="dots-horizontal" size={24} color={Colors.text.muted} />
        </TouchableOpacity>
      </View>
    ),
    [],
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
        <FlashList
          data={members}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          estimatedItemSize={70}
          contentContainerStyle={styles.listContent}
        />
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    marginLeft: 16,
  },
  headerCountBadge: {
    backgroundColor: Colors.primary.glow,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    width: 40,
    alignItems: 'center',
  },
  headerCount: {
    color: Colors.primary.main,
    fontWeight: '700',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.borderLight,
  },
  memberInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  memberName: {
    fontSize: 16,
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  actionBtn: {
    padding: Spacing.xs,
  },
});

export default TeamMembersScreen;
