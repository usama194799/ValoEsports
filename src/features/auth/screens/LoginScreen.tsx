import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthStackParamList } from '../navigation/AuthNavigator';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import AuthInput from '../components/AuthInput';
import PasswordInput from '../components/PasswordInput';
import AuthButton from '../components/AuthButton';
import SocialButton from '../components/SocialButton';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const { token, user } = await authService.login(email, password);
      await login(token, user);
      // AppNavigator will automatically switch to Main flow
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      Alert.alert('Login Error', err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top || Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Heading style={styles.title}>Welcome Back</Heading>
          <Label style={styles.subtitle}>Log in to continue to Mux Arena</Label>
        </View>

        <View style={styles.form}>
          <AuthInput
            label="Email or Username"
            value={email}
            onChangeText={setEmail}
            leftIcon="email-outline"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PasswordInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            leftIcon="lock-outline"
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rememberBtn}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <Icon
                name={rememberMe ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={20}
                color={rememberMe ? Colors.primary.main : Colors.text.muted}
              />
              <Label style={styles.rememberText}>Remember me</Label>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Label style={styles.forgotText}>Forgot Password?</Label>
            </TouchableOpacity>
          </View>

          {!!error && <Label style={styles.errorText}>{error}</Label>}

          <AuthButton
            label="Log In"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.loginBtn}
          />
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Label style={styles.dividerText}>OR CONTINUE WITH</Label>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialContainer}>
          <SocialButton provider="google" label="Google" />
          <SocialButton provider="apple" label="Apple" />
          <SocialButton provider="discord" label="Discord" />
        </View>

        <View style={styles.footer}>
          <Label style={styles.footerText}>Don't have an account? </Label>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Subheading style={styles.footerLink}>Register</Subheading>
          </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
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
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: -Spacing.sm,
  },
  rememberBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rememberText: {
    color: Colors.text.secondary,
  },
  forgotText: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  loginBtn: {
    marginTop: Spacing.md,
  },
  errorText: {
    color: Colors.danger.main,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.neutral.borderLight,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    color: Colors.text.muted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  socialContainer: {
    marginBottom: Spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.text.secondary,
  },
  footerLink: {
    color: Colors.primary.main,
    fontWeight: '700',
  },
});

export default LoginScreen;
