import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthStackParamList} from '../navigation/AuthNavigator';
import {Heading, Label} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import {authService} from '../services/authService';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    setError('');
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      await authService.requestPasswordReset(email);
      navigation.navigate('OTPVerification', {email, intent: 'reset'});
    } catch (err: any) {
      setError(err.message || 'Failed to request reset');
      Alert.alert('Error', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.content, {paddingTop: insets.top || Spacing.xl}]}>
        
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Heading style={styles.title}>Reset Password</Heading>
          <Label style={styles.subtitle}>
            Enter the email associated with your account and we'll send an email with instructions to reset your password.
          </Label>
        </View>

        <View style={styles.form}>
          <AuthInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            leftIcon="email-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            error={error}
          />

          <AuthButton
            label="Send Instructions"
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
  resetBtn: {
    marginTop: Spacing.xl,
  },
});

export default ForgotPasswordScreen;
