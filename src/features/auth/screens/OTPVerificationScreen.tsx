import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthStackParamList} from '../navigation/AuthNavigator';
import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import OTPInput from '../components/OTPInput';
import AuthButton from '../components/AuthButton';
import {authService} from '../services/authService';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTPVerification'>;
type OTPRouteProp = RouteProp<AuthStackParamList, 'OTPVerification'>;

const OTPVerificationScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<OTPRouteProp>();
  
  const {email, intent} = route.params;

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (code.length < 6) return;

    setIsLoading(true);
    try {
      await authService.verifyOTP(code);
      if (intent === 'register') {
        navigation.navigate('Success', {
          title: 'Account Created!',
          message: 'Your account has been created successfully. You can now access Mux Arena.',
        });
      } else {
        navigation.navigate('ResetPassword', {email, code});
      }
    } catch (err: any) {
      Alert.alert('Verification Failed', err.message || 'Invalid code');
      setCode('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
    // Call resend API
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
          <Heading style={styles.title}>Verification Code</Heading>
          <Label style={styles.subtitle}>
            We've sent a 6-digit code to <Label style={styles.emailText}>{email}</Label>. Please enter it below.
          </Label>
        </View>

        <View style={styles.form}>
          <OTPInput
            length={6}
            value={code}
            onChange={(val) => {
              setCode(val);
              if (val.length === 6) {
                // Auto verify
              }
            }}
          />

          <AuthButton
            label="Verify"
            onPress={handleVerify}
            loading={isLoading}
            disabled={code.length < 6}
            style={styles.verifyBtn}
          />
        </View>

        <View style={styles.resendContainer}>
          <Label style={styles.resendText}>Didn't receive the code? </Label>
          <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
            <Subheading style={[styles.resendLink, timer > 0 && styles.resendDisabled]}>
              {timer > 0 ? `Resend in ${timer}s` : 'Resend Now'}
            </Subheading>
          </TouchableOpacity>
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
    marginBottom: Spacing.lg,
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
  emailText: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  form: {
    marginBottom: Spacing.xl,
  },
  verifyBtn: {
    marginTop: Spacing.xl,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  resendText: {
    color: Colors.text.secondary,
  },
  resendLink: {
    color: Colors.primary.main,
    fontWeight: '700',
  },
  resendDisabled: {
    color: Colors.text.muted,
  },
});

export default OTPVerificationScreen;
