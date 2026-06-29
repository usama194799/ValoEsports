import React, { useEffect } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { useAuth } from '../hooks/useAuth';
import { Heading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { hasSeenOnboarding, isLoading } = useAuth();

  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Logo entrance animation
    opacity.value = withTiming(1, { duration: 400 });

    // Navigate away after 2.0s
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (!hasSeenOnboarding) {
          navigation.replace('Onboarding');
        } else {
          navigation.replace('Welcome');
        }
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [hasSeenOnboarding, isLoading, navigation, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
      }}
      style={styles.container}
      blurRadius={10}
    >
      <View style={styles.overlay} />

      <Animated.View style={[styles.content, animatedStyle]}>
        <View style={styles.logoBox}>
          <Heading style={styles.logoText}>M</Heading>
        </View>
        <Heading style={styles.appName}>MUX ARENA</Heading>
      </Animated.View>
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
    backgroundColor: 'rgba(13, 13, 26, 0.85)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: Colors.primary.main,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: Colors.primary.main,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  logoText: {
    fontSize: 64,
    color: '#FFF',
    letterSpacing: -2,
  },
  appName: {
    fontSize: 28,
    letterSpacing: 8,
    color: Colors.text.primary,
  },
});

export default SplashScreen;
