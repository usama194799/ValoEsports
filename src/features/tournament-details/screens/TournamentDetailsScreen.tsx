import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/types';
import {DetailedTournament} from '../types';
import {MOCK_TOURNAMENT_DETAILS} from '../constants';
import {Colors} from '../../../theme/colors';
import {wp} from '../../../utils/responsive';

import HeroBanner from '../components/HeroBanner';
import InfoCard from '../components/InfoCard';
import DescriptionSection from '../components/DescriptionSection';
import PrizeDistribution from '../components/PrizeDistribution';
import RulesSection from '../components/RulesSection';
import ParticipatingTeams from '../components/ParticipatingTeams';
import MatchSchedule from '../components/MatchSchedule';
import TournamentStats from '../components/TournamentStats';
import OrganizerCard from '../components/OrganizerCard';
import StickyRegistrationPanel from '../components/StickyRegistrationPanel';
import RegistrationBottomSheet from '../components/RegistrationBottomSheet';
import SkeletonDetails from '../components/SkeletonDetails';

type TournamentDetailsRouteProp = RouteProp<RootStackParamList, 'TournamentDetails'>;

const TournamentDetailsScreen: React.FC = () => {
  const route = useRoute<TournamentDetailsRouteProp>();
  const tournamentId = route.params?.tournamentId;
  
  const [loading, setLoading] = useState(true);
  const [tournament, setTournament] = useState<DetailedTournament | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    // Simulate API fetch using the ID
    const fetchDetails = async () => {
      setLoading(true);
      await new Promise<void>(resolve => setTimeout(resolve, 800));
      // Always use mock data since this is a UI implementation without real backend
      setTournament(MOCK_TOURNAMENT_DETAILS);
      setIsFavorite(MOCK_TOURNAMENT_DETAILS.isFavorite);
      setLoading(false);
    };
    
    fetchDetails();
  }, [tournamentId]);

  const handleFavoriteToggle = useCallback(() => {
    setIsFavorite(prev => !prev);
  }, []);

  const handleShare = useCallback(() => {
    console.log('Share triggered');
  }, []);

  const handleRegisterPress = useCallback(() => {
    setSheetVisible(true);
  }, []);

  const handleConfirmRegistration = useCallback(() => {
    setSheetVisible(false);
    console.log('Registration Confirmed');
  }, []);

  if (loading || !tournament) {
    return <SkeletonDetails />;
  }

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Placeholder for the absolutely positioned Hero Banner height */}
        <View style={styles.heroPlaceholder} />

        {/* Content sections */}
        <View style={styles.contentContainer}>
          <InfoCard tournament={tournament} />
          <DescriptionSection description={tournament.description} />
          <PrizeDistribution prizes={tournament.prizes} />
          <RulesSection rules={tournament.rules} />
          <ParticipatingTeams teams={tournament.teams} />
          <MatchSchedule schedule={tournament.schedule} />
          <TournamentStats stats={tournament.stats} />
          <OrganizerCard organizer={tournament.organizer} />
        </View>
      </Animated.ScrollView>

      {/* Absolutely positioned overlay components */}
      <HeroBanner
        banner={tournament.banner}
        name={tournament.name}
        organizerName={tournament.organizer.name}
        status={tournament.status}
        scrollY={scrollY}
        isFavorite={isFavorite}
        onFavorite={handleFavoriteToggle}
        onShare={handleShare}
      />

      <StickyRegistrationPanel
        tournament={tournament}
        onRegisterPress={handleRegisterPress}
      />

      <RegistrationBottomSheet
        visible={sheetVisible}
        tournament={tournament}
        onClose={() => setSheetVisible(false)}
        onConfirm={handleConfirmRegistration}
      />
    </View>
  );
};

const HEADER_MAX_HEIGHT = wp(280);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // accommodate sticky panel
  },
  heroPlaceholder: {
    height: HEADER_MAX_HEIGHT,
    width: '100%',
  },
  contentContainer: {
    backgroundColor: Colors.dark.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 1000,
  },
});

export default TournamentDetailsScreen;
