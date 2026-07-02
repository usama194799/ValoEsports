import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PrizeReward } from '../types';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { SectionContainer, CardContainer } from './LayoutContainers';

interface PrizeDistributionProps {
  prizes: PrizeReward[];
}

const getRankColor = (position: number | string) => {
  if (typeof position === 'string') return Colors.text.muted;
  switch (position) {
    case 1:
      return Colors.gaming.rankGold;
    case 2:
      return Colors.gaming.rankSilver;
    case 3:
      return Colors.gaming.rankBronze;
    default:
      return Colors.text.muted;
  }
};

const PrizeDistribution: React.FC<PrizeDistributionProps> = ({ prizes }) => {
  return (
    <SectionContainer title="Prize Distribution">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {prizes.map((prize, index) => (
          <View key={index}>
            <CardContainer style={styles.card}>
              <View
                style={[
                  styles.rankBadge,
                  { backgroundColor: getRankColor(prize.position) },
                ]}
              >
                <Label style={styles.rankText}>#{prize.position}</Label>
              </View>

              <View style={styles.iconContainer}>
                <Icon
                  name="trophy-outline"
                  size={48}
                  color={getRankColor(prize.position)}
                />
              </View>

              <View style={styles.infoContainer}>
                <Subheading style={styles.amount}>{prize.amount}</Subheading>
                <Label style={styles.type}>{prize.label}</Label>
              </View>
            </CardContainer>
          </View>
        ))}
      </ScrollView>
    </SectionContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    gap: Spacing.lg,
  },
  card: {
    width: 140,
    padding: Spacing.xl,
    alignItems: 'center',
    position: 'relative',
  },
  rankBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  rankText: {
    color: Colors.text.primary,
    fontWeight: '800',
    fontSize: 10,
  },
  iconContainer: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  infoContainer: {
    alignItems: 'center',
  },
  amount: {
    color: Colors.gaming.rankGold,
    fontSize: 18,
    marginBottom: Spacing.xs,
  },
  type: {
    color: Colors.text.muted,
    fontSize: 12,
  },
});

export default React.memo(PrizeDistribution);
