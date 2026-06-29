import React, {useState, useRef} from 'react';
import {StyleSheet, View, Dimensions, ImageBackground, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AuthStackParamList} from '../navigation/AuthNavigator';
import {useAuth} from '../hooks/useAuth';
import {Heading, Label} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import AuthButton from '../components/AuthButton';

const {width} = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Esports Tournament',
    description: 'Join daily and weekly tournaments in your favorite games and prove your skills.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Build Teams',
    description: 'Find players, build a roster, and climb the global leaderboards together.',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Win Rewards',
    description: 'Compete for cash prizes, hardware, and exclusive in-game items.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80',
  },
];

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

const OnboardingScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const {completeOnboarding} = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({x: width * (currentIndex + 1), animated: true});
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    await completeOnboarding();
    navigation.replace('Welcome');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        bounces={false}>
        {SLIDES.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <ImageBackground source={{uri: slide.image}} style={styles.image}>
              <View style={styles.gradientOverlay} />
            </ImageBackground>
            <View style={[styles.textContainer, {paddingBottom: insets.bottom + 100}]}>
              <Heading style={styles.title}>{slide.title}</Heading>
              <Label style={styles.description}>{slide.description}</Label>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination & Controls */}
      <View style={[styles.controls, {paddingBottom: insets.bottom || Spacing.md}]}>
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <AuthButton
          label={currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
          onPress={nextSlide}
        />
        
        {currentIndex < SLIDES.length - 1 && (
          <AuthButton
            label="Skip"
            variant="outline"
            onPress={finishOnboarding}
            style={{marginTop: Spacing.sm, borderWidth: 0}}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  slide: {
    width,
    flex: 1,
  },
  image: {
    flex: 0.65,
    width: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 13, 26, 0.4)',
  },
  textContainer: {
    flex: 0.35,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    alignItems: 'center',
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral.border,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: Colors.primary.main,
    width: 24,
  },
});

export default OnboardingScreen;
