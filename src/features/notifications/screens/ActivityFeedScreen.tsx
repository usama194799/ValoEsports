import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Heading, Subheading } from '../../../components/Typography';

import ActivityTimelineCard from '../components/ActivityTimelineCard';
import { MOCK_ACTIVITY_FEED, ActivityItem } from '../constants/mockData';

const ActivityFeedScreen: React.FC = () => {
  const navigation = useNavigation();

  // Group activities
  const groupedActivities = useMemo(() => {
    const groups: Record<string, ActivityItem[]> = {
      Today: [],
      Yesterday: [],
      'This Week': [],
      Older: [],
    };

    MOCK_ACTIVITY_FEED.forEach(item => {
      if (groups[item.group]) {
        groups[item.group].push(item);
      }
    });

    return groups;
  }, []);

  const renderGroup = (groupName: string, items: ActivityItem[]) => {
    if (items.length === 0) return null;

    return (
      <View key={groupName} style={styles.groupContainer}>
        <Subheading style={styles.groupHeader}>{groupName}</Subheading>
        {items.map((item, index) => (
          <ActivityTimelineCard
            key={item.id}
            activity={item}
            isFirst={index === 0}
            isLast={index === items.length - 1}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Activity Feed</Heading>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderGroup('Today', groupedActivities['Today'])}
        {renderGroup('Yesterday', groupedActivities['Yesterday'])}
        {renderGroup('This Week', groupedActivities['This Week'])}
        {renderGroup('Older', groupedActivities['Older'])}

        {MOCK_ACTIVITY_FEED.length === 0 && (
          <View style={styles.emptyContainer}>
            <Icon name="history" size={64} color={Colors.neutral.borderLight} />
            <Heading style={styles.emptyTitle}>No Recent Activity</Heading>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  iconBtn: {
    padding: Spacing.sm,
  },
  appBarTitle: {
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  groupContainer: {
    marginBottom: Spacing.xl,
  },
  groupHeader: {
    fontSize: 14,
    color: Colors.text.muted,
    marginBottom: Spacing.md,
    marginLeft: 40, // align with content, skipping timeline column
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    marginTop: Spacing.md,
    color: Colors.text.secondary,
  },
});

export default ActivityFeedScreen;
