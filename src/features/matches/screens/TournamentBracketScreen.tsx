import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackScreenProps, RootStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Heading } from '../../../components/Typography';

import BracketNode, { BracketMatch } from '../components/BracketNode';
import { matchService } from '../../../services/matchService';
import { ActivityIndicator } from 'react-native';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.TOURNAMENT_BRACKET
>['navigation'];

type ScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.TOURNAMENT_BRACKET
>;

const TournamentBracketScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { tournamentId } = route.params || { tournamentId: 'tourney_1' };

  const [loading, setLoading] = useState(true);
  const [brackets, setBrackets] = useState<any[]>([]);

  useEffect(() => {
    const fetchBrackets = async () => {
      try {
        const data = await matchService.getTournamentBrackets(tournamentId);
        setBrackets(data);
      } catch (error) {
        console.error('Failed to load brackets', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrackets();
  }, [tournamentId]);

  const semiFinals = brackets.filter(m => m.round === 'Semi-Final');
  const finals = brackets.filter(m => m.round === 'Grand Final');

  const handleNodePress = useCallback(
    (match: BracketMatch) => {
      if (match.status === 'live') {
        navigation.navigate(ROUTES.LIVE_MATCH, { matchId: match.matchId });
      } else if (match.status === 'completed') {
        navigation.navigate(ROUTES.MATCH_RESULT, { matchId: match.matchId });
      } else {
        navigation.navigate(ROUTES.MATCH_DETAILS_MODAL, {
          matchId: match.matchId,
        });
      }
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Tournament Bracket</Heading>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.verticalContent}
        maximumZoomScale={2}
        minimumZoomScale={0.5}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          contentContainerStyle={styles.horizontalContent}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.bracketWrapper}>
            {/* Round 1 (Semi Finals) */}
            <View style={styles.column}>
              <Heading style={styles.roundTitle}>Semi-Finals</Heading>
              <View style={styles.nodesContainer}>
                {semiFinals.map((match, idx) => (
                  <View
                    key={match.id}
                    style={[
                      styles.nodeWrapper,
                      idx === 0 ? { marginBottom: 80 } : {},
                    ]}
                  >
                    <BracketNode
                      match={match as BracketMatch}
                      onPress={() => handleNodePress(match as BracketMatch)}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Connecting lines column */}
            <View style={styles.connectorColumn}>
              {/* Simplified connection drawing for demo */}
              <View style={styles.verticalLineTop} />
              <View style={styles.verticalLineBottom} />
              <View style={styles.horizontalLineCenter} />
            </View>

            {/* Round 2 (Grand Final) */}
            <View style={styles.column}>
              <Heading style={styles.roundTitle}>Grand Final</Heading>
              <View
                style={[styles.nodesContainer, { justifyContent: 'center' }]}
              >
                {finals.map(match => (
                  <View key={match.id} style={styles.nodeWrapper}>
                    <BracketNode
                      match={match as BracketMatch}
                      isLast
                      onPress={() => handleNodePress(match as BracketMatch)}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
    backgroundColor: Colors.dark.surface,
    zIndex: 10,
  },
  backBtn: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  verticalContent: {
    paddingVertical: Spacing.xl,
  },
  horizontalContent: {
    paddingHorizontal: Spacing.xl,
  },
  bracketWrapper: {
    flexDirection: 'row',
  },
  column: {
    width: 180,
  },
  roundTitle: {
    fontSize: 14,
    color: Colors.text.muted,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  nodesContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  nodeWrapper: {
    justifyContent: 'center',
  },
  connectorColumn: {
    width: 40,
    position: 'relative',
    marginTop: 40, // push down past the round title
  },
  verticalLineTop: {
    position: 'absolute',
    top: '25%',
    left: '50%',
    width: 1,
    height: '25%',
    backgroundColor: Colors.neutral.border,
  },
  verticalLineBottom: {
    position: 'absolute',
    bottom: '25%',
    left: '50%',
    width: 1,
    height: '25%',
    backgroundColor: Colors.neutral.border,
  },
  horizontalLineCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50%',
    height: 1,
    backgroundColor: Colors.neutral.border,
  },
});

export default TournamentBracketScreen;
