import React, {useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {Radius} from '../../../theme/radius';
import MemberAvatar from '../components/MemberAvatar';
import EmptyState from '../../../components/EmptyState';

// Dummy requests data
const DUMMY_REQUESTS = [
  {id: 'req1', user: {name: 'shroud', avatarUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100', level: 88}, message: 'I would like to join your team!'},
  {id: 'req2', user: {name: 'Tarik', avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=100&h=100', level: 95}, message: 'Looking for a competitive squad.'},
];

const TeamRequestsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleAccept = (id: string) => {
    // accept logic
  };

  const handleDecline = (id: string) => {
    // decline logic
  };

  const renderItem = useCallback(
    ({item}: {item: typeof DUMMY_REQUESTS[0]}) => (
      <View style={styles.requestCard}>
        <View style={styles.requestHeader}>
          <MemberAvatar url={item.user.avatarUrl} size={40} />
          <View style={styles.requestInfo}>
            <Subheading style={styles.playerName}>{item.user.name}</Subheading>
            <Label style={styles.playerLevel}>Level {item.user.level}</Label>
          </View>
        </View>
        
        <View style={styles.messageBox}>
          <Label style={styles.messageText}>"{item.message}"</Label>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.declineBtn]}
            onPress={() => handleDecline(item.id)}>
            <Label style={styles.declineText}>Decline</Label>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.acceptBtn]}
            onPress={() => handleAccept(item.id)}>
            <Label style={styles.acceptText}>Accept</Label>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: insets.top || Spacing.md}]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Join Requests</Heading>
        <View style={{width: 40}} />
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={DUMMY_REQUESTS}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          estimatedItemSize={160}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              icon="inbox-outline"
              title="No Pending Requests"
              message="When players request to join your team, they will appear here."
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
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
  },
  requestCard: {
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  requestInfo: {
    marginLeft: Spacing.md,
  },
  playerName: {
    fontSize: 16,
    marginBottom: 2,
  },
  playerLevel: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  messageBox: {
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.lg,
  },
  messageText: {
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionBtn: {
    flex: 1,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  declineBtn: {
    backgroundColor: Colors.dark.surface,
    borderColor: Colors.neutral.borderLight,
  },
  declineText: {
    color: Colors.text.secondary,
    fontWeight: '600',
  },
  acceptBtn: {
    backgroundColor: Colors.primary.glow,
    borderColor: Colors.primary.main,
  },
  acceptText: {
    color: Colors.primary.main,
    fontWeight: '700',
  },
});

export default TeamRequestsScreen;
