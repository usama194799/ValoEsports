import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, RootStackScreenProps } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { DetailedTournament } from '../types';
import { Colors } from '../../../theme/colors';
import { wp } from '../../../utils/responsive';
import { Images } from '../../../theme/images';
import { tournamentService } from '../../../services';

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

type TournamentDetailsRouteProp = RouteProp<
  RootStackParamList,
  'TournamentDetails'
>;

const TournamentDetailsScreen: React.FC = () => {
  const route = useRoute<TournamentDetailsRouteProp>();
  const navigation = useNavigation<any>();
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
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await tournamentService.getTournamentById(tournamentId) as any;
        
        if (data) {
          // Map backend Tournament to DetailedTournament gracefully
          const mapped: DetailedTournament = {
            ...data,
            banner: data.image || Images.hero.bg1,
            teamSize: data.teamSize || '5v5',
            format: data.format || 'Double Elimination',
            entryFee: data.entryFee || 'Free',
            prizePool: data.prizePool || '$0',
            registrationDeadline: data.registrationDeadline || data.date,
            serverRegion: data.serverRegion || 'Global',
            platform: data.platform || 'Cross-platform',
            slotsUsed: data.slotsUsed || 0,
            description: data.description || 'No description provided.',
            isFavorite: false,
            
            // Map nested properties safely with fallbacks
            organizer: data.organizer || {
              id: 'org-0',
              name: 'Platform Admin',
              logo: Images.avatars.player1,
              isVerified: true,
              followers: 0,
              completedTournaments: 0,
              rating: 5.0,
            },
            stats: data.stats || {
              totalTeams: data.slots || 0,
              registeredPlayers: data.slotsUsed || 0,
              completedMatches: 0,
              remainingMatches: 0,
              spectators: 0,
              views: 0,
              likes: 0,
            },
            prizes: data.prizes || [],
            rules: data.rules || [
              {
                id: 'r1',
                title: 'General Rules',
                content: 'Respect all players and admins. Fair play is required.',
              }
            ],
            teams: data.teams || [],
            schedule: data.schedule || [],
          };
          setTournament(mapped);
          setIsFavorite(false);
        }
      } catch (e) {
        console.error('Failed to load tournament details', e);
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) fetchDetails();
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
    navigation.navigate(ROUTES.REGISTRATION_OVERVIEW as any, {
      tournamentId,
    });
  }, [navigation, tournamentId]);

  if (loading || !tournament) {
    return <SkeletonDetails />;
  }

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Placeholder for the absolutely positioned Hero Banner height */}
        <View style={styles.heroPlaceholder} />

        {/* Content sections */}
        <View style={styles.contentContainer}>
          <InfoCard tournament={tournament} />
          <DescriptionSection description={tournament.description} />
          <PrizeDistribution prizes={tournament.prizes} />
          <RulesSection rules={tournament.rules} />
          <TournamentStats stats={tournament.stats} />
          <OrganizerCard organizer={tournament.organizer} />
          <ParticipatingTeams teams={tournament.teams} />
          <MatchSchedule schedule={tournament.schedule} />
        </View>

      </Animated.ScrollView>

      <HeroBanner
        banner={tournament.banner}
        name={tournament.name}
        organizerName={tournament.organizer?.name || 'Platform Admin'}
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
        onClose={() => setSheetVisible(false)}
        onConfirm={handleConfirmRegistration}
        tournament={tournament}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    paddingBottom: 120, // space for sticky footer
  },
  heroPlaceholder: {
    height: wp(300),
  },
  contentContainer: {
    backgroundColor: Colors.dark.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 32,
  },
});

export default TournamentDetailsScreen;
