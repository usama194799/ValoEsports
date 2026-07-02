import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { useTeamData } from '../hooks/useTeamData';
import { teamService } from '../../../services/teamService';
import { Team } from '../types/team';
import { Game } from '../../../types';

type EditTeamRouteProp = any;

const EditTeamScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<EditTeamRouteProp>();
  const { getTeamById, gamesList } = useTeamData();

  const teamId = route.params?.teamId;
  const [team, setTeam] = useState<Team | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    name: '',
    shortTag: '',
    description: '',
    game: null as Game | null,
    privacy: 'public',
  });

  useEffect(() => {
    const init = async () => {
      try {
        const [teamData, gamesData] = await Promise.all([
          getTeamById(teamId),
          gamesList()
        ]);
        
        if (teamData) {
          setTeam(teamData);
          setForm({
            name: teamData.name || '',
            shortTag: (teamData as any).tag || teamData.shortTag || '',
            description: teamData.description || '',
            game: gamesData.find(g => g.id === (teamData as any).game_id) || gamesData[0] || null,
            privacy: teamData.privacy || 'public',
          });
        }
        setGames(gamesData);
      } catch (e) {
        console.error('Failed to load team data', e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [teamId]);

  const updateForm = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = useCallback(async () => {
    if (!form.name || !form.shortTag) {
      Alert.alert('Error', 'Name and Short Tag are required.');
      return;
    }

    try {
      setIsSaving(true);
      await teamService.updateTeam(teamId, {
        name: form.name,
        tag: form.shortTag,
        description: form.description,
        game_id: form.game?.id,
        privacy: form.privacy,
      } as any);
      navigation.goBack();
    } catch (e: any) {
      console.error('Failed to update team', e);
      Alert.alert('Error', e?.response?.data?.message || 'Failed to update team.');
    } finally {
      setIsSaving(false);
    }
  }, [form, teamId, navigation]);

  if (loading) {
    return (
      <View style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary.main} />
      </View>
    );
  }

  if (!team) return null;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Edit Team</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.bannerUpload} activeOpacity={0.8}>
            <Image
              source={{ uri: team.bannerUrl || 'https://via.placeholder.com/600x200' }}
              style={StyleSheet.absoluteFill as any}
            />
            <View style={styles.overlay}>
              <Icon
                name="camera-plus-outline"
                size={32}
                color={Colors.text.primary}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.logoUploadWrapper}>
            <TouchableOpacity style={styles.logoUpload} activeOpacity={0.8}>
              <Image source={{ uri: team.logoUrl || 'https://via.placeholder.com/150' }} style={styles.logoImg} />
              <View style={styles.overlay}>
                <Icon
                  name="camera-plus-outline"
                  size={24}
                  color={Colors.text.primary}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Label style={styles.inputLabel}>Team Name *</Label>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter team name"
                placeholderTextColor={Colors.text.muted}
                value={form.name}
                onChangeText={v => updateForm('name', v)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Label style={styles.inputLabel}>Short Tag *</Label>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="e.g. MUX"
                placeholderTextColor={Colors.text.muted}
                value={form.shortTag}
                onChangeText={v => updateForm('shortTag', v.toUpperCase())}
                maxLength={4}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Label style={styles.inputLabel}>About (Optional)</Label>
            <View style={[styles.inputWrapper, { height: 100 }]}>
              <TextInput
                style={[styles.input, { textAlignVertical: 'top' }]}
                placeholder="Describe your team..."
                placeholderTextColor={Colors.text.muted}
                value={form.description}
                onChangeText={v => updateForm('description', v)}
                multiline
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Label style={styles.inputLabel}>Primary Game</Label>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chipRow}>
                {games.map(g => {
                  const isSelected = form.game?.id === g.id;
                  return (
                    <TouchableOpacity
                      key={g.id}
                      style={[styles.chip, isSelected && styles.chipActive]}
                      onPress={() => updateForm('game', g)}
                    >
                      <Label
                        style={[
                          styles.chipLabel,
                          isSelected && styles.chipLabelActive,
                        ]}
                      >
                        {g.name}
                      </Label>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Label style={styles.inputLabel}>Privacy</Label>
            <View style={styles.chipRow}>
              <TouchableOpacity
                style={[
                  styles.chip,
                  form.privacy === 'public' && styles.chipActive,
                ]}
                onPress={() => updateForm('privacy', 'public')}
              >
                <Icon
                  name="earth"
                  size={16}
                  color={
                    form.privacy === 'public'
                      ? Colors.text.primary
                      : Colors.text.muted
                  }
                />
                <Label
                  style={[
                    styles.chipLabel,
                    form.privacy === 'public' && styles.chipLabelActive,
                  ]}
                >
                  Public
                </Label>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.chip,
                  form.privacy === 'private' && styles.chipActive,
                ]}
                onPress={() => updateForm('privacy', 'private')}
              >
                <Icon
                  name="lock-outline"
                  size={16}
                  color={
                    form.privacy === 'private'
                      ? Colors.text.primary
                      : Colors.text.muted
                  }
                />
                <Label
                  style={[
                    styles.chipLabel,
                    form.privacy === 'private' && styles.chipLabelActive,
                  ]}
                >
                  Private
                </Label>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.submitBtn, isSaving && { opacity: 0.7 }]} 
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={Colors.text.primary} />
          ) : (
            <Heading style={styles.submitBtnText}>Save Changes</Heading>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  uploadSection: {
    marginBottom: Spacing.xl,
  },
  bannerUpload: {
    height: 120,
    backgroundColor: Colors.dark.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFill as any,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoUploadWrapper: {
    position: 'absolute',
    bottom: -40,
    left: Spacing.lg,
    padding: 4,
    backgroundColor: Colors.dark.background,
    borderRadius: Radius.full,
  },
  logoUpload: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    overflow: 'hidden',
  },
  logoImg: {
    ...StyleSheet.absoluteFill as any,
  },
  formSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    gap: Spacing.lg,
  },
  inputGroup: {
    gap: Spacing.xs,
  },
  inputLabel: {
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  inputWrapper: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    height: 48,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 16,
  },
  chipRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.dark.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  chipActive: {
    backgroundColor: Colors.primary.glow,
    borderColor: Colors.primary.main,
  },
  chipLabel: {
    color: Colors.text.muted,
  },
  chipLabelActive: {
    color: Colors.primary.main,
  },
  submitBtn: {
    backgroundColor: Colors.primary.main,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
    height: 56,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: Colors.text.primary,
    fontSize: 16,
  },
});

export default EditTeamScreen;
