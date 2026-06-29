import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {Radius} from '../../../theme/radius';
import {useTeamData} from '../hooks/useTeamData';
import TeamCard from '../components/TeamCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';
import {ROUTES} from '../../../navigation/routes';

type JoinTeamNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const JoinTeamScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<JoinTeamNavigationProp>();
  const [code, setCode] = useState('');
  const [search, setSearch] = useState('');
  
  const {teams} = useTeamData();

  const handleJoinByCode = useCallback(() => {
    if (code.length === 6) {
      // Simulate joining
      navigation.goBack();
    }
  }, [code, navigation]);

  const handleTeamPress = useCallback(
    (teamId: string) => {
      navigation.navigate(ROUTES.TEAM_DETAILS, {teamId});
    },
    [navigation],
  );

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: insets.top || Spacing.md}]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Join Team</Heading>
        <View style={{width: 40}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Join by Code */}
        <View style={styles.section}>
          <Heading style={styles.sectionTitle}>Have an invite code?</Heading>
          <Label style={styles.sectionDesc}>Enter the 6-digit code provided by the team captain.</Label>
          
          <View style={styles.codeRow}>
            <View style={styles.codeInputWrapper}>
              <Icon name="ticket-confirmation-outline" size={20} color={Colors.text.muted} />
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
              style={[styles.joinBtn, code.length === 6 && styles.joinBtnActive]}
              onPress={handleJoinByCode}
              disabled={code.length !== 6}>
              <Subheading style={[styles.joinText, code.length === 6 && styles.joinTextActive]}>
                Join
              </Subheading>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.qrBtn}>
            <Icon name="qrcode-scan" size={20} color={Colors.primary.main} />
            <Label style={styles.qrText}>Scan QR Code</Label>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Search Public Teams */}
        <View style={styles.section}>
          <Heading style={styles.sectionTitle}>Search Public Teams</Heading>
          <View style={styles.searchBar}>
            <Icon name="magnify" size={20} color={Colors.text.muted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by team name or tag"
              placeholderTextColor={Colors.text.muted}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <View style={styles.teamsList}>
          {teams.map((team, index) => (
            <TeamCard
              key={team.id}
              team={team}
              index={index}
              onPress={() => handleTeamPress(team.id)}
            />
          ))}
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
  scrollContent: {
    paddingBottom: Spacing.xxl * 2,
  },
  section: {
    padding: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: Spacing.xs,
  },
  sectionDesc: {
    color: Colors.text.muted,
    marginBottom: Spacing.lg,
  },
  codeRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  codeInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  codeInput: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 18,
    letterSpacing: 2,
    marginLeft: Spacing.sm,
  },
  joinBtn: {
    width: 80,
    height: 48,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  joinBtnActive: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  joinText: {
    color: Colors.text.muted,
  },
  joinTextActive: {
    color: Colors.text.primary,
    fontWeight: '700',
  },
  qrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: Colors.primary.glow,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.primary.main,
    gap: Spacing.sm,
  },
  qrText: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  divider: {
    height: 8,
    backgroundColor: Colors.dark.surface,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
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
  teamsList: {
    paddingHorizontal: Spacing.lg,
  },
});

export default JoinTeamScreen;
