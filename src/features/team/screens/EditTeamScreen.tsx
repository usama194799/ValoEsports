import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {Radius} from '../../../theme/radius';
import {useTeamData} from '../hooks/useTeamData';

type EditTeamRouteProp = any;

const EditTeamScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<EditTeamRouteProp>();
  const {getTeamById, gamesList} = useTeamData();
  
  const teamId = route.params?.teamId;
  const team = getTeamById(teamId);

  const [form, setForm] = useState({
    name: team?.name || '',
    shortTag: team?.shortTag || '',
    description: team?.description || '',
    game: team?.game || gamesList[0],
    privacy: team?.privacy || 'public',
  });

  const updateForm = (key: string, value: string) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const handleSave = useCallback(() => {
    // Simulate save
    navigation.goBack();
  }, [navigation]);

  if (!team) return null;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.header, {paddingTop: insets.top || Spacing.md}]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Edit Team</Heading>
        <View style={{width: 40}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.bannerUpload} activeOpacity={0.8}>
            <Image source={{uri: team.bannerUrl}} style={StyleSheet.absoluteFillObject} />
            <View style={styles.overlay}>
              <Icon name="camera-plus-outline" size={32} color={Colors.text.primary} />
            </View>
          </TouchableOpacity>
          <View style={styles.logoUploadWrapper}>
            <TouchableOpacity style={styles.logoUpload} activeOpacity={0.8}>
              <Image source={{uri: team.logoUrl}} style={styles.logoImg} />
              <View style={styles.overlay}>
                <Icon name="camera-plus-outline" size={24} color={Colors.text.primary} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

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
        </View>
      </ScrollView>

      <View style={[styles.footer, {paddingBottom: insets.bottom || Spacing.lg}]}>
        <TouchableOpacity style={styles.createBtn} onPress={handleSave}>
          <Subheading style={styles.createText}>Save Changes</Subheading>
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
    overflow: 'hidden',
  },
  logoUpload: {
    flex: 1,
  },
  logoImg: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
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

export default EditTeamScreen;
