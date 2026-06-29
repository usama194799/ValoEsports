import React from 'react';
import {StyleSheet} from 'react-native';
import BadgeChip from './BadgeChip';

interface LocationBadgeProps {
  locationName: string;
}

const LocationBadge: React.FC<LocationBadgeProps> = ({locationName}) => {
  return <BadgeChip icon="map-marker-outline" label={locationName} style={styles.badge} />;
};

const styles = StyleSheet.create({
  badge: {
    // Specific styles for location badge if needed
  },
});

export default React.memo(LocationBadge);
