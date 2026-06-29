import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthStackParamList } from '../navigation/AuthNavigator';
import { Heading, Label } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import PasswordInput from '../components/PasswordInput';
import AuthButton from '../components/AuthButton';
import { authService } from '../services/authService';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ResetPassword'
>;

const ResetPasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = calculateStrength(password);

  const handleReset = async () => {
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(password);
      navigation.navigate('Success', {
        title: 'Password Reset',
        message:
          'Your password has been reset successfully. You can now log in with your new password.',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
      Alert.alert('Error', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStrengthBars = () => {
    return (
      <View style={styles.strengthContainer}>
        {[1, 2, 3, 4].map(level => {
          let bgColor = Colors.dark.surface;
          if (strength >= level) {
            if (strength <= 2) bgColor = Colors.danger.main;
            else if (strength === 3) bgColor = Colors.warning.main;
            else bgColor = Colors.success.main;
          }
          return (
            <View
              key={level}
              style={[styles.strengthBar, { backgroundColor: bgColor }]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.content, { paddingTop: insets.top || Spacing.xl }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Heading style={styles.title}>Create New Password</Heading>
          <Label style={styles.subtitle}>
            Your new password must be different from previous used passwords.
          </Label>
        </View>

        <View style={styles.form}>
          <PasswordInput
            label="New Password"
            value={password}
            onChangeText={setPassword}
            leftIcon="lock-outline"
            error={error}
          />

          <View style={styles.strengthWrapper}>
            <Label style={styles.strengthText}>Password Strength</Label>
            {renderStrengthBars()}
          </View>

          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            leftIcon="lock-check-outline"
          />

          <AuthButton
            label="Reset Password"
            onPress={handleReset}
            loading={isLoading}
            style={styles.resetBtn}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  strengthWrapper: {
    marginBottom: Spacing.lg,
    marginTop: -Spacing.sm,
  },
  strengthText: {
    fontSize: 12,
    color: Colors.text.muted,
    marginBottom: Spacing.xs,
  },
  strengthContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  resetBtn: {
    marginTop: Spacing.xl,
  },
});

export default ResetPasswordScreen;
