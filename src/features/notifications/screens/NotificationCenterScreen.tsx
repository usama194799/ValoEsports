import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackScreenProps } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label } from '../../../components/Typography';

import NotificationCard from '../components/NotificationCard';
import { MOCK_NOTIFICATIONS, AppNotification } from '../constants/mockData';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.NOTIFICATION_CENTER
>['navigation'];

const TABS = [
  'All',
  'Tournament',
  'Matches',
  'Teams',
  'Friends',
  'Rewards',
  'System',
];

const NotificationCenterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState('All');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const handleMarkRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isUnread: false } : n)),
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handlePress = (notif: AppNotification) => {
    navigation.navigate(ROUTES.NOTIFICATION_DETAILS, {
      notificationId: notif.id,
    });
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab !== 'All' && n.category !== activeTab) return false;
    if (searchQuery) {
      return (
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.titleRow}>
          <Heading style={styles.headerTitle}>Notifications</Heading>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Label style={styles.badgeText}>{unreadCount}</Label>
            </View>
          )}
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setIsSearchActive(!isSearchActive)}
          >
            <Icon name="magnify" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate(ROUTES.ACTIVITY_FEED)}
          >
            <Icon name="history" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate(ROUTES.NOTIFICATION_SETTINGS)}
          >
            <Icon name="cog-outline" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {isSearchActive && (
        <View style={styles.searchBar}>
          <Icon name="magnify" size={20} color={Colors.text.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search notifications..."
            placeholderTextColor={Colors.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={20} color={Colors.text.muted} />
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      <View style={styles.subHeader}>
        <TouchableOpacity onPress={handleMarkAllRead}>
          <Label style={styles.markReadText}>Mark all as read</Label>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="filter-variant" size={16} color={Colors.text.primary} />
          <Label style={styles.filterText}>Filters</Label>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => setActiveTab(tab)}
            >
              <Label
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Label>
              {activeTab === tab && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon
        name="bell-off-outline"
        size={64}
        color={Colors.neutral.borderLight}
      />
      <Heading style={styles.emptyTitle}>No Notifications</Heading>
      <Label style={styles.emptySubtitle}>You're all caught up!</Label>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      {renderHeader()}
      <View style={styles.listContainer}>
        <FlashList
          data={filteredNotifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              notification={item}
              onPress={() => handlePress(item)}
              onMarkRead={() => handleMarkRead(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          estimatedItemSize={120}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    backgroundColor: Colors.dark.surface,
    paddingTop: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
  },
  badge: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.full,
    marginLeft: Spacing.sm,
  },
  badgeText: {
    color: Colors.dark.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: Spacing.sm,
    padding: Spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardAlt,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: Colors.text.primary,
    marginLeft: Spacing.sm,
    fontSize: 14,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  markReadText: {
    color: Colors.primary.main,
    fontSize: 13,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardAlt,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  filterText: {
    fontSize: 12,
    marginLeft: 4,
  },
  tabsWrapper: {
    marginTop: Spacing.md,
  },
  tabsScroll: {
    paddingHorizontal: Spacing.lg,
  },
  tab: {
    paddingVertical: Spacing.sm,
    marginRight: Spacing.lg,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    color: Colors.text.muted,
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.primary.main,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.primary.main,
    borderRadius: 1,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    color: Colors.text.muted,
  },
});

export default NotificationCenterScreen;
