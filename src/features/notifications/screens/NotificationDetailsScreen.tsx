import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  RootStackScreenProps,
  RootStackParamList,
} from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

import { MOCK_NOTIFICATIONS } from '../constants/mockData';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.NOTIFICATION_DETAILS
>['navigation'];
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.NOTIFICATION_DETAILS
>;

const NotificationDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { notificationId } = route.params;

  const notification =
    MOCK_NOTIFICATIONS.find(n => n.id === notificationId) ||
    MOCK_NOTIFICATIONS[0];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tournament':
        return Colors.primary.main;
      case 'Matches':
        return Colors.danger.main;
      case 'Teams':
        return Colors.gaming.rankGold;
      case 'Friends':
        return '#3498db';
      case 'Rewards':
        return Colors.warning.main;
      case 'System':
        return Colors.text.muted;
      default:
        return Colors.primary.main;
    }
  };

  const iconColor = getCategoryColor(notification.category);

  const handleActionPress = () => {
    if (!notification.actionType) return;

    switch (notification.actionType) {
      case 'view_match':
        if (notification.relatedId) {
          navigation.navigate(ROUTES.MATCH_DETAILS_MODAL, {
            matchId: notification.relatedId,
          });
        }
        break;
      case 'view_team':
        // navigation.navigate(ROUTES.TEAM_DETAILS, {teamId: notification.relatedId});
        break;
      case 'accept_request':
        // Handle logic
        navigation.goBack();
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Details</Heading>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="dots-vertical" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconWrapper}>
          <View
            style={[styles.largeIconBox, { backgroundColor: `${iconColor}15` }]}
          >
            <Icon name={notification.iconName} size={64} color={iconColor} />
          </View>
        </View>

        <View style={styles.textCenter}>
          <Label style={[styles.categoryText, { color: iconColor }]}>
            {notification.category.toUpperCase()} • {notification.relativeTime}
          </Label>
          <Heading style={styles.title}>{notification.title}</Heading>
        </View>

        <View style={styles.card}>
          <Subheading style={styles.description}>
            {notification.description}
          </Subheading>

          {/* Mock extra details that might be pulled from API */}
          {notification.category === 'Tournament' && (
            <View style={styles.metaBox}>
              <Label style={styles.metaLabel}>Tournament ID</Label>
              <Subheading style={styles.metaValue}>
                {notification.relatedId}
              </Subheading>
            </View>
          )}
        </View>

        {notification.actionType && (
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleActionPress}
            activeOpacity={0.8}
          >
            <Heading style={styles.btnText}>
              {notification.actionType.replace('_', ' ').toUpperCase()}
            </Heading>
          </TouchableOpacity>
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
  },
  iconBtn: {
    padding: Spacing.sm,
  },
  appBarTitle: {
    fontSize: 18,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  iconWrapper: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  largeIconBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginBottom: Spacing.xl,
  },
  description: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  metaBox: {
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.border,
  },
  metaLabel: {
    color: Colors.text.muted,
    fontSize: 12,
  },
  metaValue: {
    color: Colors.text.primary,
    marginTop: 4,
  },
  primaryBtn: {
    backgroundColor: Colors.primary.glow,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: Colors.primary.main,
    fontSize: 16,
  },
});

export default NotificationDetailsScreen;
