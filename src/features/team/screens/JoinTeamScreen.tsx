import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { useTeamData } from '../hooks/useTeamData';
import { teamService } from '../../../services/teamService';
import TeamCard from '../components/TeamCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Team } from '../types/team';

type JoinTeamNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const JoinTeamScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<JoinTeamNavigationProp>();
  const [code, setCode] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const { getMyTeams } = useTeamData();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchTeams = useCallback(async (query: string) => {
    try {
      setLoading(true);
      // Usually, you would hit a global search endpoint here, not just "my teams".
      // Assuming getTeams endpoint exists with a search query.
      const data = await teamService.getTeams(query ? { search: query } : {});
      setTeams(data);
    } catch (e) {
      console.error('Failed to search teams', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTeams(debouncedSearch);
    }, [debouncedSearch, fetchTeams])
  );

  const handleJoinByCode = useCallback(async () => {
    if (code.length === 6) {
      try {
        // Here we simulate the code acceptance. The backend may have a /team-invitations/code/accept
        // Let's assume we request join instead as a fallback.
        // Alert.alert('Simulated Join', 'This is a stub for code joining.');
        navigation.goBack();
      } catch (e) {
        console.error('Failed to join by code', e);
      }
    }
  }, [code, navigation]);

  const handleTeamPress = useCallback(
    (teamId: string) => {
      navigation.navigate(ROUTES.TEAM_DETAILS, { teamId });
    },
    [navigation],
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
        <Heading style={styles.headerTitle}>Join Team</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Join by Code */}
        <View style={styles.section}>
          <Heading style={styles.sectionTitle}>Have an invite code?</Heading>
          <Label style={styles.sectionDesc}>
            Enter the 6-digit code provided by the team captain.
          </Label>

          <View style={styles.codeRow}>
            <View style={styles.codeInputWrapper}>
              <Icon
                name="ticket-confirmation-outline"
                size={20}
                color={Colors.text.muted}
              />
              <TextInput
                style={styles.codeInput}
                placeholder="000000"
                placeholderTextColor={Colors.text.muted}
                maxLength={6}
                value={code}
                onChangeText={setCode}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              style={[
                styles.joinBtn,
                code.length === 6 && styles.joinBtnActive,
              ]}
              onPress={handleJoinByCode}
              disabled={code.length !== 6}
            >
              <Subheading
                style={[
                  styles.joinText,
                  code.length === 6 && styles.joinTextActive,
                ]}
              >
                Join
              </Subheading>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Browse Teams */}
        <View style={styles.section}>
          <View style={styles.browseHeader}>
            <Heading style={styles.sectionTitle}>Browse Teams</Heading>
            <TouchableOpacity style={styles.filterBtn}>
              <Icon name="tune-variant" size={20} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBox}>
            <Icon
              name="magnify"
              size={20}
              color={Colors.text.muted}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or tag..."
              placeholderTextColor={Colors.text.muted}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <View style={styles.teamsList}>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.primary.main} style={{ marginTop: Spacing.xl }} />
            ) : teams.length > 0 ? (
              teams.map((t, index) => (
                <TeamCard
                  key={t.id}
                  team={t}
                  index={index}
                  onPress={() => handleTeamPress(t.id)}
                />
              ))
            ) : (
              <Label style={styles.emptyText}>No teams found.</Label>
            )}
          </View>
        </View>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.border,
    backgroundColor: Colors.dark.surface,
  },
  backBtn: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: Spacing.xs,
  },
  sectionDesc: {
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
  },
  codeRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  codeInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    paddingHorizontal: Spacing.md,
    height: 52,
    gap: Spacing.sm,
  },
  codeInput: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: '600',
  },
  joinBtn: {
    backgroundColor: Colors.dark.surfaceLight,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinBtnActive: {
    backgroundColor: Colors.primary.main,
  },
  joinText: {
    color: Colors.text.muted,
  },
  joinTextActive: {
    color: Colors.text.primary,
  },
  divider: {
    height: 8,
    backgroundColor: Colors.dark.surfaceLight,
  },
  browseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    marginBottom: Spacing.xl,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 14,
  },
  teamsList: {
    gap: Spacing.md,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.text.muted,
    marginTop: Spacing.xl,
  }
});

export default JoinTeamScreen;
