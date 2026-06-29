import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {Radius} from '../../../theme/radius';
import {useProfileData} from '../hooks/useProfileData';

// Re-using Auth components for inputs and buttons (assuming they are generic enough)
import AuthInput from '../../auth/components/AuthInput';
import AuthButton from '../../auth/components/AuthButton';

const EditProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {profile, updateProfile, isLoading} = useProfileData();

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    bio: '',
    country: '',
    language: '',
    favouriteGame: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || '',
        username: profile.username || '',
        bio: profile.bio || '',
        country: profile.country || '',
        language: profile.language || '',
        favouriteGame: profile.favouriteGame || '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await updateProfile(form);
    setIsSaving(false);
    
    if (success) {
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to save profile updates.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      
      <View style={[styles.header, {paddingTop: insets.top || Spacing.md}]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Edit Profile</Heading>
        <View style={{width: 40}} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover & Avatar Edit */}
        <View style={styles.mediaContainer}>
          <ImageBackground
            source={{uri: profile?.coverUrl || 'https://via.placeholder.com/1024x400'}}
            style={styles.coverImage}>
            <View style={styles.overlay} />
            <TouchableOpacity style={styles.cameraBtn}>
              <Icon name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </ImageBackground>

          <View style={styles.avatarContainer}>
            <Image
              source={{uri: profile?.avatarUrl || 'https://via.placeholder.com/256'}}
              style={styles.avatarImage}
            />
            <TouchableOpacity style={[styles.cameraBtn, styles.avatarCameraBtn]}>
              <Icon name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          <AuthInput
            label="Full Name"
            value={form.fullName}
            onChangeText={(v) => setForm(f => ({...f, fullName: v}))}
            leftIcon="account-outline"
          />
          <AuthInput
            label="Username"
            value={form.username}
            onChangeText={(v) => setForm(f => ({...f, username: v}))}
            leftIcon="at"
            autoCapitalize="none"
          />
          <AuthInput
            label="Bio"
            value={form.bio}
            onChangeText={(v) => setForm(f => ({...f, bio: v}))}
            leftIcon="card-text-outline"
            multiline
            style={{height: 100, textAlignVertical: 'top', paddingTop: Spacing.md}}
          />
          <AuthInput
            label="Country"
            value={form.country}
            onChangeText={(v) => setForm(f => ({...f, country: v}))}
            leftIcon="map-marker-outline"
          />
          <AuthInput
            label="Language"
            value={form.language}
            onChangeText={(v) => setForm(f => ({...f, language: v}))}
            leftIcon="web"
          />
          <AuthInput
            label="Favourite Game"
            value={form.favouriteGame}
            onChangeText={(v) => setForm(f => ({...f, favouriteGame: v}))}
            leftIcon="gamepad-variant-outline"
          />

          <View style={styles.actionContainer}>
            <AuthButton
              label="Save Changes"
              onPress={handleSave}
              loading={isSaving}
              style={{marginBottom: Spacing.sm}}
            />
            <AuthButton
              label="Discard"
              variant="outline"
              onPress={() => navigation.goBack()}
              disabled={isSaving}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  backBtn: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
  },
  mediaContainer: {
    marginBottom: Spacing.xl,
  },
  coverImage: {
    width: '100%',
    height: 150,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: Spacing.md,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cameraBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    left: Spacing.xl,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.dark.background,
  },
  avatarCameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  formContainer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  actionContainer: {
    marginTop: Spacing.md,
  },
});

export default EditProfileScreen;
