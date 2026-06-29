import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import MemberAvatar from '../components/MemberAvatar';
import { useTeamData } from '../hooks/useTeamData';
import EmptyState from '../../../components/EmptyState';

// Dummy Players
const DUMMY_PLAYERS = [
  {
    id: 'p1',
    name: 'S1mple',
    avatarUrl:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100',
    status: 'pending',
  },
  {
    id: 'p2',
    name: 'ZywOo',
    avatarUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=100&h=100',
    status: 'none',
  },
  {
    id: 'p3',
    name: 'NiKo',
    avatarUrl:
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=100&h=100',
    status: 'accepted',
  },
];

const InvitePlayersScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [players, setPlayers] = useState(DUMMY_PLAYERS);

  const handleInvite = (id: string) => {
    setPlayers(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'pending' } : p)),
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: (typeof DUMMY_PLAYERS)[0] }) => (
      <View style={styles.playerRow}>
        <MemberAvatar url={item.avatarUrl} size={48} />
        <View style={styles.playerInfo}>
          <Subheading style={styles.playerName}>{item.name}</Subheading>
          <Label style={styles.playerSub}>Suggested Player</Label>
        </View>
        {item.status === 'none' ? (
          <TouchableOpacity
            style={styles.inviteBtn}
            onPress={() => handleInvite(item.id)}
          >
            <Label style={styles.inviteText}>Invite</Label>
          </TouchableOpacity>
        ) : item.status === 'pending' ? (
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: 'rgba(255,215,0,0.1)' },
            ]}
          >
            <Label
              style={[styles.statusText, { color: Colors.gaming.rankGold }]}
            >
              Pending
            </Label>
          </View>
        ) : (
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: 'rgba(52,199,89,0.1)' },
            ]}
          >
            <Label style={[styles.statusText, { color: Colors.success.main }]}>
              Accepted
            </Label>
          </View>
        )}
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
        <Heading style={styles.headerTitle}>Invite Players</Heading>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="magnify" size={20} color={Colors.text.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by username or tag"
            placeholderTextColor={Colors.text.muted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon name="close-circle" size={16} color={Colors.text.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={players.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          estimatedItemSize={70}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              title="No players found"
              message="Try searching for a different username."
            />
          }
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
  },
  searchContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.dark.surface,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  searchInput: {
    flex: 1,
    color: Colors.text.primary,
    marginLeft: Spacing.sm,
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.borderLight,
  },
  playerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  playerName: {
    fontSize: 16,
    marginBottom: 2,
  },
  playerSub: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  inviteBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    backgroundColor: Colors.primary.glow,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primary.main,
  },
  inviteText: {
    color: Colors.primary.main,
    fontWeight: '600',
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
  },
});

export default InvitePlayersScreen;
