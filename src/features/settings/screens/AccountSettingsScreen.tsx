import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label } from '../../../components/Typography';
import { MOCK_USER_PROFILE } from '../constants/mockData';

const AccountSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(MOCK_USER_PROFILE);

  const handleSave = () => {
    // Mock save
    navigation.goBack();
  };

  const renderInput = (
    label: string,
    value: string,
    onChange: (val: string) => void,
    multiline = false,
  ) => (
    <View style={styles.inputWrapper}>
      <Label style={styles.inputLabel}>{label}</Label>
      <View
        style={[
          styles.inputContainer,
          multiline && {
            height: 80,
            alignItems: 'flex-start',
            paddingTop: Spacing.sm,
          },
        ]}
      >
        <TextInput
          style={[styles.input, multiline && { textAlignVertical: 'top' }]}
          value={value}
          onChangeText={onChange}
          placeholderTextColor={Colors.text.muted}
          multiline={multiline}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Account Settings</Heading>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Heading style={styles.saveBtnText}>Save</Heading>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Images */}
        <View style={styles.imagesContainer}>
          <Image
            source={{ uri: profile.coverImage }}
            style={styles.coverImage}
          />
          <TouchableOpacity style={styles.editCoverBtn}>
            <Icon name="camera" size={20} color={Colors.neutral.white} />
          </TouchableOpacity>

          <View style={styles.avatarWrapper}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Icon name="pencil" size={16} color={Colors.neutral.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          {renderInput('Full Name', profile.fullName, val =>
            setProfile({ ...profile, fullName: val }),
          )}
          {renderInput('Username', profile.username, val =>
            setProfile({ ...profile, username: val }),
          )}
          {renderInput('Email Address', profile.email, val =>
            setProfile({ ...profile, email: val }),
          )}
          {renderInput('Phone Number', profile.phone, val =>
            setProfile({ ...profile, phone: val }),
          )}

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: Spacing.sm }}>
              {renderInput('Country', profile.country, val =>
                setProfile({ ...profile, country: val }),
              )}
            </View>
            <View style={{ flex: 1, marginLeft: Spacing.sm }}>
              {renderInput('Region', profile.region, val =>
                setProfile({ ...profile, region: val }),
              )}
            </View>
          </View>

          {renderInput('Date of Birth', profile.dob, val =>
            setProfile({ ...profile, dob: val }),
          )}

          {renderInput(
            'Bio',
            profile.bio,
            val => setProfile({ ...profile, bio: val }),
            true,
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.dark.surface,
  },
  iconBtn: {
    padding: Spacing.sm,
  },
  appBarTitle: {
    fontSize: 18,
  },
  saveBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    backgroundColor: Colors.accent.transparent,
    borderRadius: Radius.full,
  },
  saveBtnText: {
    color: Colors.primary.main,
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  imagesContainer: {
    height: 180,
    marginBottom: 60,
  },
  coverImage: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.dark.cardAlt,
  },
  editCoverBtn: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.lg,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.dark.background,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: Colors.dark.cardAlt,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
  formContainer: {
    paddingHorizontal: Spacing.lg,
  },
  inputWrapper: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: 12,
    color: Colors.text.muted,
    marginBottom: Spacing.xs,
    letterSpacing: 0.5,
  },
  inputContainer: {
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    borderRadius: Radius.md,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
  },
});

export default AccountSettingsScreen;
