import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

interface RegistrationCardProps {
  tournament: any;
}

const RegistrationCard: React.FC<RegistrationCardProps> = ({ tournament }) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: tournament.bannerUrl }}
        style={styles.banner}
        imageStyle={{
          borderTopLeftRadius: Radius.lg,
          borderTopRightRadius: Radius.lg,
        }}
      >
        <LinearGradient
          colors={['transparent', Colors.neutral.blackTransparent.max]}
          style={styles.gradient}
        >
          <Heading style={styles.title}>{tournament.name}</Heading>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon
              name="gamepad-variant"
              size={20}
              color={Colors.primary.main}
            />
            <View style={styles.infoTextContainer}>
              <Label style={styles.infoLabel}>Game</Label>
              <Subheading style={styles.infoValue}>
                {tournament.game}
              </Subheading>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Icon name="account-group" size={20} color={Colors.primary.main} />
            <View style={styles.infoTextContainer}>
              <Label style={styles.infoLabel}>Mode</Label>
              <Subheading style={styles.infoValue}>
                {tournament.mode}
              </Subheading>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon
              name="ticket-percent"
              size={20}
              color={Colors.gaming.rankGold}
            />
            <View style={styles.infoTextContainer}>
              <Label style={styles.infoLabel}>Entry Fee</Label>
              <Subheading
                style={[styles.infoValue, { color: Colors.gaming.rankGold }]}
              >
                {tournament.entryFee}
              </Subheading>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Icon name="trophy" size={20} color={Colors.gaming.rankGold} />
            <View style={styles.infoTextContainer}>
              <Label style={styles.infoLabel}>Prize Pool</Label>
              <Subheading
                style={[styles.infoValue, { color: Colors.gaming.rankGold }]}
              >
                {tournament.prizePool}
              </Subheading>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.datesContainer}>
          <View style={styles.dateBox}>
            <Label style={styles.dateLabel}>Registration Closes</Label>
            <Subheading style={styles.dateValue}>
              {tournament.registrationDeadline}
            </Subheading>
          </View>
          <View style={styles.slotsBox}>
            <Label style={styles.dateLabel}>Slots Remaining</Label>
            <Subheading style={styles.slotsValue}>
              {tournament.slotsRemaining} / {tournament.totalSlots}
            </Subheading>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    marginBottom: Spacing.xl,
  },
  banner: {
    height: 140,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: '100%',
    justifyContent: 'flex-end',
    padding: Spacing.md,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
  },
  title: {
    color: Colors.text.primary,
    fontSize: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  content: {
    padding: Spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.borderLight,
    marginVertical: Spacing.md,
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  dateBox: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    color: Colors.text.muted,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
  },
  dateValue: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  slotsBox: {
    alignItems: 'flex-end',
  },
  slotsValue: {
    fontSize: 14,
    color: Colors.primary.main,
    fontWeight: '700',
  },
});

export default React.memo(RegistrationCard);
