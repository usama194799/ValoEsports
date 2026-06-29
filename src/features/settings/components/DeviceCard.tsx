import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { DeviceSession } from '../constants/mockData';

interface DeviceCardProps {
  session: DeviceSession;
  onSignOut?: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ session, onSignOut }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Icon
          name={session.icon}
          size={28}
          color={session.isCurrent ? Colors.gaming.open : Colors.text.secondary}
        />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Heading style={styles.name}>{session.name}</Heading>
          {session.isCurrent && (
            <View style={styles.currentBadge}>
              <Label style={styles.currentText}>THIS DEVICE</Label>
            </View>
          )}
        </View>
        <Subheading style={styles.details}>
          {session.platform} • {session.location}
        </Subheading>
        <Label
          style={[
            styles.lastActive,
            session.isCurrent && { color: Colors.gaming.open },
          ]}
        >
          {session.lastActive}
        </Label>
      </View>

      {!session.isCurrent && onSignOut && (
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={onSignOut}
          activeOpacity={0.8}
        >
          <Icon name="logout-variant" size={20} color={Colors.gaming.live} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.neutral.borderLight,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.dark.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    color: Colors.text.primary,
  },
  currentBadge: {
    backgroundColor: Colors.success.transparent.medium, // Success with opacity
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.xs,
    marginLeft: Spacing.sm,
  },
  currentText: {
    fontSize: 9,
    color: Colors.gaming.open,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  lastActive: {
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 2,
  },
  signOutBtn: {
    padding: Spacing.sm,
    backgroundColor: Colors.primary.transparent.light,
    borderRadius: Radius.md,
    marginLeft: Spacing.sm,
  },
});

export default DeviceCard;
