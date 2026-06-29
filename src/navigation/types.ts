import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ROUTES} from './routes';

export type BottomTabParamList = {
  [ROUTES.HOME_TAB]: undefined;
  [ROUTES.TOURNAMENTS_TAB]: undefined;
  [ROUTES.TEAMS_TAB]: undefined;
  [ROUTES.LEADERBOARD_TAB]: undefined;
  [ROUTES.PROFILE_TAB]: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
  [ROUTES.TOURNAMENT_DETAILS]: {tournamentId: string};
  [ROUTES.TEAM_DETAILS]: {teamId: string};
  [ROUTES.CREATE_TEAM]: undefined;
  [ROUTES.EDIT_TEAM]: {teamId: string};
  [ROUTES.INVITE_PLAYERS]: {teamId: string};
  [ROUTES.JOIN_TEAM]: undefined;
  [ROUTES.TEAM_MEMBERS]: {teamId: string};
  [ROUTES.TEAM_REQUESTS]: {teamId: string};
  [ROUTES.TEAM_SETTINGS]: {teamId: string};
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.SEARCH]: undefined;
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
