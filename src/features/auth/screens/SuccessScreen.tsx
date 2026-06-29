import React, {useEffect} from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthStackParamList} from '../navigation/AuthNavigator';
import {Heading, Label} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import AuthButton from '../components/AuthButton';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Success'>;
type SuccessRouteProp = RouteProp<AuthStackParamList, 'Success'>;

const SuccessScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SuccessRouteProp>();
  const {title, message} = route.params;

  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Disable back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    
    scale.value = withSpring(1, {damping: 12});
    opacity.value = withDelay(300, withTiming(1, {duration: 500}));

    return () => backHandler.remove();
  }, [opacity, scale]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: withTiming(opacity.value === 1 ? 0 : 20)}],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
          <View style={styles.iconCircle}>
            <Icon name="check" size={64} color={Colors.success.main} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.textContainer, animatedTextStyle]}>
          <Heading style={styles.title}>{title}</Heading>
          <Label style={styles.message}>{message}</Label>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <AuthButton
          label="Continue to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.xxl,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 200, 83, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.success.main,
    shadowColor: Colors.success.main,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
});

export default SuccessScreen;
