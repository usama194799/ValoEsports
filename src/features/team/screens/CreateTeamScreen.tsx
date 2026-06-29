import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {Radius} from '../../../theme/radius';
import {useTeamData} from '../hooks/useTeamData';

const CreateTeamScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {gamesList, regionsList} = useTeamData();

  const [form, setForm] = useState({
    name: '',
    shortTag: '',
    description: '',
    game: gamesList[0],
    region: regionsList[0],
    privacy: 'public',
  });

  const updateForm = (key: string, value: string) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const handleCreate = useCallback(() => {
    // Simulate creation and go back
    navigation.goBack();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.header, {paddingTop: insets.top || Spacing.md}]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Create Team</Heading>
        <View style={{width: 40}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Uploads Placeholder */}
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.bannerUpload}>
            <Icon name="camera-plus-outline" size={32} color={Colors.text.muted} />
            <Label style={styles.uploadText}>Upload Banner</Label>
          </TouchableOpacity>
          <View style={styles.logoUploadWrapper}>
            <TouchableOpacity style={styles.logoUpload}>
              <Icon name="camera-plus-outline" size={24} color={Colors.text.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Label style={styles.inputLabel}>Team Name</Label>
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
            <Label style={styles.inputLabel}>Short Tag</Label>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="e.g. C9"
                placeholderTextColor={Colors.text.muted}
                maxLength={4}
                value={form.shortTag}
                onChangeText={v => updateForm('shortTag', v)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Label style={styles.inputLabel}>Description</Label>
            <View style={[styles.inputWrapper, {height: 100}]}>
              <TextInput
                style={[styles.input, {textAlignVertical: 'top'}]}
                placeholder="Tell us about your team..."
                placeholderTextColor={Colors.text.muted}
                multiline
                numberOfLines={4}
                value={form.description}
                onChangeText={v => updateForm('description', v)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Label style={styles.inputLabel}>Primary Game</Label>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
              {gamesList.map(game => (
                <TouchableOpacity
                  key={game}
                  style={[styles.chip, form.game === game && styles.chipActive]}
                  onPress={() => updateForm('game', game)}>
                  <Label style={[styles.chipText, form.game === game && styles.chipTextActive]}>
                    {game}
                  </Label>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Label style={styles.inputLabel}>Privacy</Label>
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.radioBtn, form.privacy === 'public' && styles.radioBtnActive]}
                onPress={() => updateForm('privacy', 'public')}>
                <Icon name="earth" size={20} color={form.privacy === 'public' ? Colors.primary.main : Colors.text.muted} />
                <Subheading style={[styles.radioText, form.privacy === 'public' && styles.radioTextActive]}>
                  Public
                </Subheading>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioBtn, form.privacy === 'private' && styles.radioBtnActive]}
                onPress={() => updateForm('privacy', 'private')}>
                <Icon name="lock-outline" size={20} color={form.privacy === 'private' ? Colors.primary.main : Colors.text.muted} />
                <Subheading style={[styles.radioText, form.privacy === 'private' && styles.radioTextActive]}>
                  Private
                </Subheading>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>

      <View style={[styles.footer, {paddingBottom: insets.bottom || Spacing.lg}]}>
        <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
          <Subheading style={styles.createText}>Create Team</Subheading>
        </TouchableOpacity>
      </View>
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
  uploadSection: {
    height: 240,
    position: 'relative',
    marginBottom: Spacing.xl,
  },
  bannerUpload: {
    height: 200,
    backgroundColor: Colors.dark.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: Colors.text.muted,
    marginTop: Spacing.xs,
  },
  logoUploadWrapper: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.xl,
    width: 80,
    height: 80,
    borderRadius: Radius.lg,
    borderWidth: 4,
    borderColor: Colors.dark.background,
    backgroundColor: Colors.dark.surface,
  },
  logoUpload: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSection: {
    paddingHorizontal: Spacing.xl,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    height: 48,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 14,
  },
  chipScroll: {
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  chipActive: {
    backgroundColor: 'rgba(232, 33, 74, 0.1)',
    borderColor: Colors.primary.main,
  },
  chipText: {
    color: Colors.text.secondary,
  },
  chipTextActive: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  radioBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    gap: Spacing.sm,
  },
  radioBtnActive: {
    borderColor: Colors.primary.main,
    backgroundColor: 'rgba(232, 33, 74, 0.05)',
  },
  radioText: {
    color: Colors.text.secondary,
  },
  radioTextActive: {
    color: Colors.primary.main,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 0.5,
    borderTopColor: Colors.neutral.border,
  },
  createBtn: {
    height: 48,
    backgroundColor: Colors.primary.main,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: {
    color: Colors.text.primary,
    fontWeight: '700',
  },
});

export default CreateTeamScreen;
