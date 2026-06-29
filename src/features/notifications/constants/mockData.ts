export type NotificationCategory =
  | 'Tournament'
  | 'Matches'
  | 'Teams'
  | 'Friends'
  | 'System'
  | 'Rewards';
export type Priority = 'High' | 'Normal' | 'Low';

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  type: string;
  title: string;
  description: string;
  relativeTime: string;
  isUnread: boolean;
  priority: Priority;
  iconName: string;
  actionType?: 'view_match' | 'view_team' | 'accept_request';
  relatedId?: string;
}

export interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  iconName: string;
  iconColor: string;
  group: 'Today' | 'Yesterday' | 'This Week' | 'Older';
}

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n_1',
    category: 'Tournament',
    type: 'Registration Approved',
    title: 'Registration Approved',
    description: 'Your team Cloud9 has been approved for VCT 2026 Masters.',
    relativeTime: '2m ago',
    isUnread: true,
    priority: 'High',
    iconName: 'check-decagram',
    actionType: 'view_team',
    relatedId: 'tourney_1',
  },
  {
    id: 'n_2',
    category: 'Matches',
    type: 'Match Scheduled',
    title: 'Match Scheduled',
    description: 'You have a match against Sentinels scheduled for 18:00 UTC.',
    relativeTime: '1h ago',
    isUnread: true,
    priority: 'High',
    iconName: 'calendar-clock',
    actionType: 'view_match',
    relatedId: 'match_1',
  },
  {
    id: 'n_3',
    category: 'Friends',
    type: 'Friend Request',
    title: 'New Friend Request',
    description: 'TenZ sent you a friend request.',
    relativeTime: '2h ago',
    isUnread: true,
    priority: 'Normal',
    iconName: 'account-plus',
    actionType: 'accept_request',
  },
  {
    id: 'n_4',
    category: 'Rewards',
    type: 'Prize Received',
    title: 'Prize Received',
    description: 'You received $15,000 for winning VCT Challengers.',
    relativeTime: '1d ago',
    isUnread: false,
    priority: 'High',
    iconName: 'cash-multiple',
  },
  {
    id: 'n_5',
    category: 'Teams',
    type: 'Captain Promotion',
    title: 'Promoted to Captain',
    description: 'You are now the Captain of Cloud9.',
    relativeTime: '2d ago',
    isUnread: false,
    priority: 'Normal',
    iconName: 'shield-star',
    actionType: 'view_team',
    relatedId: 'team_1',
  },
  {
    id: 'n_6',
    category: 'System',
    type: 'Maintenance',
    title: 'Scheduled Maintenance',
    description:
      'Servers will be down for 2 hours on Thursday for maintenance.',
    relativeTime: '3d ago',
    isUnread: false,
    priority: 'Low',
    iconName: 'server-network-off',
  },
];

export const MOCK_ACTIVITY_FEED: ActivityItem[] = [
  {
    id: 'a_1',
    type: 'Joined Team',
    title: 'Joined Cloud9',
    description: 'You accepted an invitation to join Cloud9.',
    timestamp: '10:30 AM',
    iconName: 'account-group',
    iconColor: '#3498db',
    group: 'Today',
  },
  {
    id: 'a_2',
    type: 'Won Match',
    title: 'Victory vs NRG Esports',
    description: 'You won the match 13-10 on Ascent.',
    timestamp: 'Yesterday, 8:00 PM',
    iconName: 'sword-cross',
    iconColor: '#2ecc71',
    group: 'Yesterday',
  },
  {
    id: 'a_3',
    type: 'Earned XP',
    title: 'Earned 500 XP',
    description: 'Daily challenge completed.',
    timestamp: 'Yesterday, 1:00 PM',
    iconName: 'star-four-points',
    iconColor: '#f1c40f',
    group: 'Yesterday',
  },
  {
    id: 'a_4',
    type: 'Registered Tournament',
    title: 'Registered for VCT Masters',
    description: 'Your team was submitted for VCT 2026 Masters qualifiers.',
    timestamp: 'Tuesday',
    iconName: 'trophy',
    iconColor: '#9b59b6',
    group: 'This Week',
  },
  {
    id: 'a_5',
    type: 'Unlocked Achievement',
    title: 'Sharpshooter unlocked',
    description: 'Achieved 50% headshot rate in a single match.',
    timestamp: 'Oct 12',
    iconName: 'bullseye-arrow',
    iconColor: '#e74c3c',
    group: 'Older',
  },
];
