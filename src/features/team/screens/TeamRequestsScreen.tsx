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
import MemberAvatar from '../components/MemberAvatar';
import EmptyState from '../../../components/EmptyState';
import { useTeamData } from '../hooks/useTeamData';
import { teamService } from '../../../services/teamService';

const TeamRequestsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { getTeamRequests } = useTeamData();

  const teamId = route.params?.teamId;
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTeamRequests(teamId);
      setRequests(data);
    } catch (e) {
      console.error('Failed to load requests', e);
    } finally {
      setLoading(false);
    }
  }, [teamId, getTeamRequests]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleAccept = async (id: string) => {
    try {
      await teamService.approveRequest(id);
      Alert.alert('Success', 'Request approved.');
      fetchRequests();
    } catch (e: any) {
      Alert.alert('Error', e?.response?.data?.message || 'Failed to approve request.');
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await teamService.rejectRequest(id);
      Alert.alert('Success', 'Request rejected.');
      fetchRequests();
    } catch (e: any) {
      Alert.alert('Error', e?.response?.data?.message || 'Failed to reject request.');
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <View style={styles.requestCard}>
        <View style={styles.requestHeader}>
          <MemberAvatar url={item.user?.avatarUrl || 'https://via.placeholder.com/150'} size={40} />
          <View style={styles.requestInfo}>
            <Subheading style={styles.playerName}>{item.user?.username || item.user?.name || 'Player'}</Subheading>
            <Label style={styles.playerLevel}>Level {item.user?.level || 1}</Label>
          </View>
        </View>

        <View style={styles.messageBox}>
          <Label style={styles.messageText}>"{item.message || 'I would like to join your team!'}"</Label>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.declineBtn]}
            onPress={() => handleDecline(item.id)}
          >
            <Label style={styles.declineText}>Decline</Label>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.acceptBtn]}
            onPress={() => handleAccept(item.id)}
          >
            <Label style={styles.acceptText}>Accept</Label>
          </TouchableOpacity>
        </View>
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
        <Heading style={styles.headerTitle}>Join Requests</Heading>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary.main} style={{ marginTop: Spacing.xxl }} />
        ) : requests.length > 0 ? (
          <FlashList
            data={requests}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            estimatedItemSize={150}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <EmptyState
            title="No Requests"
            message="There are no pending join requests."
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
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  requestCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
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
    color: Colors.text.primary,
  },
  playerLevel: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  messageBox: {
    backgroundColor: Colors.dark.surfaceLight,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
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
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  declineBtn: {
    backgroundColor: 'transparent',
    borderColor: '#FF4B4B',
  },
  declineText: {
    color: '#FF4B4B',
    fontWeight: 'bold',
  },
  acceptBtn: {
    backgroundColor: Colors.primary.glow,
    borderColor: Colors.primary.main,
  },
  acceptText: {
    color: Colors.primary.main,
    fontWeight: 'bold',
  },
});

export default TeamRequestsScreen;
