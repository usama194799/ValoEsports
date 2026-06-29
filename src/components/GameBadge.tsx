import React from 'react';
import { StyleSheet } from 'react-native';
import BadgeChip from './BadgeChip';

interface GameBadgeProps {
  gameName: string;
}

const GameBadge: React.FC<GameBadgeProps> = ({ gameName }) => {
  return (
    <BadgeChip icon="gamepad-variant" label={gameName} style={styles.badge} />
  );
};

const styles = StyleSheet.create({
  badge: {
    // Specific styles for game badge if needed
  },
});

export default React.memo(GameBadge);
