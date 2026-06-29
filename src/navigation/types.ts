import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES } from './routes';

export type BottomTabParamList = {
  [ROUTES.HOME_TAB]: undefined;
  [ROUTES.TOURNAMENTS_TAB]: undefined;
  [ROUTES.TEAMS_TAB]: undefined;
  [ROUTES.LEADERBOARD_TAB]: undefined;
  [ROUTES.PROFILE_TAB]: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
  [ROUTES.TOURNAMENT_DETAILS]: { tournamentId: string };
  [ROUTES.TEAM_DETAILS]: { teamId: string };
  [ROUTES.CREATE_TEAM]: undefined;
  [ROUTES.EDIT_TEAM]: { teamId: string };
  [ROUTES.INVITE_PLAYERS]: { teamId: string };
  [ROUTES.JOIN_TEAM]: undefined;
  [ROUTES.TEAM_MEMBERS]: { teamId: string };
  [ROUTES.TEAM_REQUESTS]: { teamId: string };
  [ROUTES.TEAM_SETTINGS]: { teamId: string };
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.SEARCH]: undefined;

  [ROUTES.EDIT_PROFILE]: undefined;
  [ROUTES.PLAYER_STATISTICS]: undefined;
  [ROUTES.MATCH_HISTORY]: undefined;
  [ROUTES.ACHIEVEMENTS]: undefined;
  [ROUTES.SOCIAL_LINKS]: undefined;
  [ROUTES.PROFILE_SETTINGS]: undefined;

  [ROUTES.REGISTRATION_OVERVIEW]: { tournamentId: string };
  [ROUTES.SELECT_TEAM_REGISTRATION]: { tournamentId: string };
  [ROUTES.QUICK_CREATE_TEAM]: { tournamentId: string };
  [ROUTES.TEAM_VERIFICATION]: { tournamentId: string; teamId: string };
  [ROUTES.REGISTRATION_CONFIRMATION]: { tournamentId: string; teamId: string };
  [ROUTES.REGISTRATION_SUCCESS]: { tournamentId: string; teamId: string };

  [ROUTES.MATCH_CENTER]: undefined;
  [ROUTES.TOURNAMENT_BRACKET]: { tournamentId: string };
  [ROUTES.MATCH_DETAILS_MODAL]: { matchId: string };
  [ROUTES.LIVE_MATCH]: { matchId: string };
  [ROUTES.MATCH_RESULT]: { matchId: string };
  [ROUTES.MATCHES_HISTORY_GLOBAL]: undefined;

  [ROUTES.NOTIFICATION_CENTER]: undefined;
  [ROUTES.NOTIFICATION_DETAILS]: { notificationId: string };
  [ROUTES.ACTIVITY_FEED]: undefined;
  [ROUTES.NOTIFICATION_SETTINGS]: undefined;

  [ROUTES.WALLET_DASHBOARD]: undefined;
  [ROUTES.WALLET_TRANSACTIONS]: undefined;
  [ROUTES.REWARDS_CENTER]: undefined;
  [ROUTES.COINS_XP]: undefined;
  [ROUTES.WITHDRAW_FUNDS]: undefined;
  [ROUTES.ADD_BALANCE]: undefined;
  [ROUTES.PAYMENT_METHODS]: undefined;
  [ROUTES.TRANSACTION_DETAILS]: { transactionId: string };
  [ROUTES.REFERRAL_REWARDS]: undefined;

  [ROUTES.SETTINGS_HOME]: undefined;
  [ROUTES.ACCOUNT_SETTINGS]: undefined;
  [ROUTES.SECURITY_SETTINGS]: undefined;
  [ROUTES.PRIVACY_SETTINGS]: undefined;
  [ROUTES.APPEARANCE_SETTINGS]: undefined;
  [ROUTES.LANGUAGE_REGION_SETTINGS]: undefined;
  [ROUTES.CONNECTED_ACCOUNTS_SETTINGS]: undefined;
  [ROUTES.DEVICES_SESSIONS_SETTINGS]: undefined;
  [ROUTES.DATA_STORAGE_SETTINGS]: undefined;
  [ROUTES.HELP_SUPPORT_SETTINGS]: undefined;
  [ROUTES.ABOUT_SETTINGS]: undefined;
};

// Strongly typed props for Stack Screens
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Strongly typed props for Tab Screens (composite so they can also push to stack)
export type BottomTabScreenPropsType<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
