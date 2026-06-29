import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthStackParamList} from '../navigation/AuthNavigator';
import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import AuthInput from '../components/AuthInput';
import PasswordInput from '../components/PasswordInput';
import AuthButton from '../components/AuthButton';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName) newErrors.fullName = 'Required';
    if (!form.username) newErrors.username = 'Required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreed) {
      Alert.alert('Terms Required', 'You must agree to the Terms & Conditions.');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;
    
    // Pass data to OTP Verification Screen
    navigation.navigate('OTPVerification', {email: form.email, intent: 'register'});
  };

  const updateForm = (key: string, value: string) => {
    setForm(prev => ({...prev, [key]: value}));
    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => ({...prev, [key]: ''}));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, {paddingTop: insets.top || Spacing.xl}]}
        showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Heading style={styles.title}>Create Account</Heading>
          <Label style={styles.subtitle}>Join Mux Arena today</Label>
        </View>

        <View style={styles.avatarPicker}>
          <TouchableOpacity style={styles.avatarCircle}>
            <Icon name="camera-plus" size={32} color={Colors.text.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <AuthInput
            label="Full Name"
            value={form.fullName}
            onChangeText={(v) => updateForm('fullName', v)}
            leftIcon="account-outline"
            error={errors.fullName}
          />

          <AuthInput
            label="Username"
            value={form.username}
            onChangeText={(v) => updateForm('username', v)}
            leftIcon="at"
            autoCapitalize="none"
            error={errors.username}
          />

          <AuthInput
            label="Email Address"
            value={form.email}
            onChangeText={(v) => updateForm('email', v)}
            leftIcon="email-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <AuthInput
            label="Phone Number"
            value={form.phone}
            onChangeText={(v) => updateForm('phone', v)}
            leftIcon="phone-outline"
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <PasswordInput
            label="Password"
            value={form.password}
            onChangeText={(v) => updateForm('password', v)}
            leftIcon="lock-outline"
            error={errors.password}
          />

          <PasswordInput
            label="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(v) => updateForm('confirmPassword', v)}
            leftIcon="lock-check-outline"
            error={errors.confirmPassword}
          />

          <TouchableOpacity
            style={styles.termsBtn}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.7}>
            <Icon
              name={agreed ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={20}
              color={agreed ? Colors.primary.main : Colors.text.muted}
            />
            <Label style={styles.termsText}>
              I accept the <Text style={styles.termsLink}>Terms & Conditions</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
            </Label>
          </TouchableOpacity>

          <AuthButton
            label="Create Account"
            onPress={handleRegister}
            loading={isLoading}
            style={styles.registerBtn}
          />
        </View>

        <View style={styles.footer}>
          <Label style={styles.footerText}>Already have an account? </Label>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Subheading style={styles.footerLink}>Log In</Subheading>
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
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  avatarPicker: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginBottom: Spacing.xl,
  },
  termsBtn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
    paddingRight: Spacing.xl,
  },
  termsText: {
    color: Colors.text.secondary,
    lineHeight: 20,
    flex: 1,
  },
  termsLink: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  registerBtn: {
    marginTop: Spacing.xs,
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

export default RegisterScreen;
