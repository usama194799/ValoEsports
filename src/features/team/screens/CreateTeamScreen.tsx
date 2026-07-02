import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { useTeamData } from '../hooks/useTeamData';
import { teamService } from '../../../services/teamService';
import { Game } from '../../../types';

const CreateTeamScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { gamesList, regionsList } = useTeamData();

  const [games, setGames] = useState<Game[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    shortTag: '',
    description: '',
    game: null as Game | null,
    region: regionsList[0],
    privacy: 'public',
  });

  useEffect(() => {
    const initData = async () => {
      try {
        const data = await gamesList();
        setGames(data);
        if (data.length > 0) {
          setForm(prev => ({ ...prev, game: data[0] }));
        }
      } catch (e) {
        console.error('Failed to load games', e);
      } finally {
        setLoadingInitial(false);
      }
    };
    initData();
  }, []);

  const updateForm = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleCreate = useCallback(async () => {
    if (!form.name || !form.shortTag || !form.game) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      await teamService.createTeam({
        name: form.name,
        tag: form.shortTag,
        description: form.description,
        game_id: form.game.id,
        region: form.region.id,
        privacy: form.privacy,
      });
      navigation.goBack();
    } catch (e: any) {
      console.error('Failed to create team', e);
      Alert.alert('Error', e?.response?.data?.message || 'Failed to create team.');
    } finally {
      setIsSubmitting(false);
    }
  }, [form, navigation]);

  if (loadingInitial) {
    return (
      <View style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary.main} />
      </View>
    );
  }

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
        <Heading style={styles.headerTitle}>Create Team</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Uploads Placeholder */}
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.bannerUpload}>
            <Icon
              name="camera-plus-outline"
              size={32}
              color={Colors.text.muted}
            />
            <Label style={styles.uploadText}>Upload Banner</Label>
          </TouchableOpacity>
          <View style={styles.logoUploadWrapper}>
            <TouchableOpacity style={styles.logoUpload}>
              <Icon
                name="camera-plus-outline"
                size={24}
                color={Colors.text.muted}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
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
                {games.map(game => {
                  const isSelected = form.game?.id === game.id;
                  return (
                    <TouchableOpacity
                      key={game.id}
                      style={[styles.chip, isSelected && styles.chipActive]}
                      onPress={() => updateForm('game', game)}
                    >
                      <Label
                        style={[
                          styles.chipLabel,
                          isSelected && styles.chipLabelActive,
                        ]}
                      >
                        {game.name}
                      </Label>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Label style={styles.inputLabel}>Region</Label>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chipRow}>
                {regionsList.map(r => {
                  const isSelected = form.region.id === r.id;
                  return (
                    <TouchableOpacity
                      key={r.id}
                      style={[styles.chip, isSelected && styles.chipActive]}
                      onPress={() => updateForm('region', r)}
                    >
                      <Label
                        style={[
                          styles.chipLabel,
                          isSelected && styles.chipLabelActive,
                        ]}
                      >
                        {r.name}
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
          style={[styles.submitBtn, isSubmitting && { opacity: 0.7 }]} 
          onPress={handleCreate}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
             <ActivityIndicator color={Colors.text.primary} />
          ) : (
            <Heading style={styles.submitBtnText}>Create Team</Heading>
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
  },
  uploadText: {
    marginTop: Spacing.xs,
    color: Colors.text.muted,
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

export default CreateTeamScreen;
