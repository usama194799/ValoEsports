import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Subheading, Label } from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';
import { SectionContainer } from './LayoutContainers';
import { OrganizerProfile } from '../types';

const formatNumber = (num: number) =>
  num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

const OrganizerCard: React.FC<{ organizer: OrganizerProfile }> = ({
  organizer,
}) => (
  <SectionContainer title="Organized By">
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: organizer.logo }} style={styles.logo} />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Subheading style={styles.name} numberOfLines={1}>
              {organizer.name}
            </Subheading>
            {organizer.isVerified && (
              <Icon
                name="check-decagram"
                size={16}
                color={Colors.primary.main}
              />
            )}
          </View>
          <View style={styles.statsRow}>
            <Label style={styles.statLabel}>
              {formatNumber(organizer.followers)} Followers
            </Label>
            <View style={styles.dot} />
            <Label style={styles.statLabel}>
              {organizer.completedTournaments} Tournaments
            </Label>
          </View>
        </View>
        <View style={styles.ratingBadge}>
          <Icon name="star" size={12} color={Colors.gaming.rankGold} />
          <Label style={styles.ratingText}>{organizer.rating.toFixed(1)}</Label>
        </View>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.messageBtn}>
          <Icon name="message-outline" size={18} color={Colors.text.primary} />
          <Label style={styles.messageText}>Message</Label>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBtn}>
          <Label style={styles.profileText}>View Profile</Label>
        </TouchableOpacity>
      </View>
    </View>
  </SectionContainer>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.surface,
    marginRight: Spacing.md,
  },
  info: { flex: 1 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  name: { fontSize: 16 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statLabel: { fontSize: 11, color: Colors.text.muted },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.text.muted,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gaming.rankGold,
  },
  actionRow: { flexDirection: 'row', gap: Spacing.md },
  messageBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  messageText: { fontWeight: '600' },
  profileBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: Colors.primary.glow,
    borderRadius: Radius.md,
  },
  profileText: { color: Colors.primary.main, fontWeight: '700' },
});

export default React.memo(OrganizerCard);
