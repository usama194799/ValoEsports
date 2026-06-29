import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { ActivityItem } from '../constants/mockData';

interface ActivityTimelineCardProps {
  activity: ActivityItem;
  isFirst?: boolean;
  isLast?: boolean;
}

const ActivityTimelineCard: React.FC<ActivityTimelineCardProps> = ({
  activity,
  isFirst,
  isLast,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.timelineColumn}>
        <View
          style={[
            styles.timelineLine,
            isFirst && styles.timelineLineTransparent,
          ]}
        />
        <View
          style={[
            styles.iconBox,
            { backgroundColor: `${activity.iconColor}20` },
          ]}
        >
          <Icon name={activity.iconName} size={16} color={activity.iconColor} />
        </View>
        <View
          style={[
            styles.timelineLine,
            isLast && styles.timelineLineTransparent,
          ]}
        />
      </View>

      <View style={styles.contentColumn}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Heading style={styles.title} numberOfLines={1}>
              {activity.title}
            </Heading>
            <Label style={styles.timeText}>{activity.timestamp}</Label>
          </View>
          <Subheading style={styles.description}>
            {activity.description}
          </Subheading>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  timelineColumn: {
    width: 40,
    alignItems: 'center',
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.neutral.borderLight,
  },
  timelineLineTransparent: {
    backgroundColor: 'transparent',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.xs,
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
  contentColumn: {
    flex: 1,
    paddingBottom: Spacing.md,
    paddingTop: Spacing.xs,
    paddingRight: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 14,
    color: Colors.text.primary,
    flex: 1,
    marginRight: Spacing.sm,
  },
  timeText: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  description: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
});

export default ActivityTimelineCard;
