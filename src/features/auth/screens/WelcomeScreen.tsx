import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthStackParamList } from '../navigation/AuthNavigator';
import { Heading, Label } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import AuthButton from '../components/AuthButton';
import { useAuth } from '../hooks/useAuth';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth(); // for guest login

  const handleGuestLogin = () => {
    login('guest_token', {
      id: 'guest',
      username: 'Guest Player',
      email: '',
      fullName: 'Guest',
      role: 'Guest',
    });
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80',
      }}
      style={styles.container}
    >
      <View style={styles.overlay} />

      <View
        style={[styles.content, { paddingBottom: insets.bottom || Spacing.lg }]}
      >
        <View style={styles.textContainer}>
          <Heading style={styles.title}>Ready to Play?</Heading>
          <Label style={styles.subtitle}>
            Join millions of players in the ultimate competitive gaming
            platform.
          </Label>
        </View>

        <View style={styles.actionContainer}>
          <AuthButton
            label="Create Account"
            onPress={() => navigation.navigate('Register')}
            style={styles.btn}
          />
          <AuthButton
            label="Log In"
            variant="secondary"
            onPress={() => navigation.navigate('Login')}
            style={styles.btn}
          />

          <TouchableOpacity onPress={handleGuestLogin} style={styles.guestBtn}>
            <Label style={styles.guestText}>Continue as Guest</Label>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  overlay: {
    ...(StyleSheet.absoluteFill as any),
    backgroundColor: 'rgba(13, 13, 26, 0.75)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xl,
  },
  textContainer: {
    marginBottom: Spacing.xxl * 1.5,
  },
  title: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  actionContainer: {
    width: '100%',
  },
  btn: {
    marginBottom: Spacing.md,
  },
  guestBtn: {
    alignItems: 'center',
    padding: Spacing.md,
    marginTop: Spacing.sm,
  },
  guestText: {
    color: Colors.text.muted,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default WelcomeScreen;
