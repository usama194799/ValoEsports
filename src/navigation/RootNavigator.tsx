import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ROUTES } from './routes';

import BottomTabNavigator from './BottomTabNavigator';
import TournamentDetailsScreen from '../features/tournament-details/screens/TournamentDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';

import TeamDetailsScreen from '../features/team/screens/TeamDetailsScreen';
import CreateTeamScreen from '../features/team/screens/CreateTeamScreen';
import EditTeamScreen from '../features/team/screens/EditTeamScreen';
import InvitePlayersScreen from '../features/team/screens/InvitePlayersScreen';
import JoinTeamScreen from '../features/team/screens/JoinTeamScreen';
import TeamMembersScreen from '../features/team/screens/TeamMembersScreen';
import TeamRequestsScreen from '../features/team/screens/TeamRequestsScreen';
import TeamSettingsScreen from '../features/team/screens/TeamSettingsScreen';

import EditProfileScreen from '../features/profile/screens/EditProfileScreen';
import PlayerStatisticsScreen from '../features/profile/screens/PlayerStatisticsScreen';
import MatchHistoryScreen from '../features/profile/screens/MatchHistoryScreen';
import AchievementsScreen from '../features/profile/screens/AchievementsScreen';
import SocialLinksScreen from '../features/profile/screens/SocialLinksScreen';
import ProfileSettingsScreen from '../features/profile/screens/ProfileSettingsScreen';

import RegistrationOverviewScreen from '../features/registration/screens/RegistrationOverviewScreen';
import SelectTeamScreen from '../features/registration/screens/SelectTeamScreen';
import QuickCreateTeamScreen from '../features/registration/screens/QuickCreateTeamScreen';
import TeamVerificationScreen from '../features/registration/screens/TeamVerificationScreen';
import RegistrationConfirmationScreen from '../features/registration/screens/RegistrationConfirmationScreen';
import RegistrationSuccessScreen from '../features/registration/screens/RegistrationSuccessScreen';

import MatchCenterScreen from '../features/matches/screens/MatchCenterScreen';
import TournamentBracketScreen from '../features/matches/screens/TournamentBracketScreen';
import MatchDetailsScreen from '../features/matches/screens/MatchDetailsScreen';
import LiveMatchScreen from '../features/matches/screens/LiveMatchScreen';
import MatchResultScreen from '../features/matches/screens/MatchResultScreen';
import MatchesHistoryScreen from '../features/matches/screens/MatchesHistoryScreen';

import NotificationCenterScreen from '../features/notifications/screens/NotificationCenterScreen';
import NotificationDetailsScreen from '../features/notifications/screens/NotificationDetailsScreen';
import ActivityFeedScreen from '../features/notifications/screens/ActivityFeedScreen';
import NotificationSettingsScreen from '../features/notifications/screens/NotificationSettingsScreen';

import WalletDashboardScreen from '../features/wallet/screens/WalletDashboardScreen';
import WalletTransactionsScreen from '../features/wallet/screens/WalletTransactionsScreen';
import RewardsCenterScreen from '../features/wallet/screens/RewardsCenterScreen';
import CoinsXPScreen from '../features/wallet/screens/CoinsXPScreen';
import WithdrawFundsScreen from '../features/wallet/screens/WithdrawFundsScreen';
import AddBalanceScreen from '../features/wallet/screens/AddBalanceScreen';
import PaymentMethodsScreen from '../features/wallet/screens/PaymentMethodsScreen';
import TransactionDetailsScreen from '../features/wallet/screens/TransactionDetailsScreen';
import ReferralRewardsScreen from '../features/wallet/screens/ReferralRewardsScreen';

import SettingsHomeScreen from '../features/settings/screens/SettingsHomeScreen';
import AccountSettingsScreen from '../features/settings/screens/AccountSettingsScreen';
import SecurityScreen from '../features/settings/screens/SecurityScreen';
import PrivacyScreen from '../features/settings/screens/PrivacyScreen';
import AppearanceScreen from '../features/settings/screens/AppearanceScreen';
import LanguageRegionScreen from '../features/settings/screens/LanguageRegionScreen';
import ConnectedAccountsScreen from '../features/settings/screens/ConnectedAccountsScreen';
import DevicesSessionsScreen from '../features/settings/screens/DevicesSessionsScreen';
import DataStorageScreen from '../features/settings/screens/DataStorageScreen';
import HelpSupportScreen from '../features/settings/screens/HelpSupportScreen';
import AboutScreen from '../features/settings/screens/AboutScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen
        name={ROUTES.TOURNAMENT_DETAILS}
        component={TournamentDetailsScreen}
      />
      <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
      <Stack.Screen name={ROUTES.SEARCH} component={SearchScreen} />
      <Stack.Screen name={ROUTES.TEAM_DETAILS} component={TeamDetailsScreen} />
      <Stack.Screen name={ROUTES.CREATE_TEAM} component={CreateTeamScreen} />
      <Stack.Screen name={ROUTES.EDIT_TEAM} component={EditTeamScreen} />
      <Stack.Screen
        name={ROUTES.INVITE_PLAYERS}
        component={InvitePlayersScreen}
      />
      <Stack.Screen name={ROUTES.JOIN_TEAM} component={JoinTeamScreen} />
      <Stack.Screen name={ROUTES.TEAM_MEMBERS} component={TeamMembersScreen} />
      <Stack.Screen
        name={ROUTES.TEAM_REQUESTS}
        component={TeamRequestsScreen}
      />
      <Stack.Screen
        name={ROUTES.TEAM_SETTINGS}
        component={TeamSettingsScreen}
      />
      <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfileScreen} />
      <Stack.Screen
        name={ROUTES.PLAYER_STATISTICS}
        component={PlayerStatisticsScreen}
      />
      <Stack.Screen
        name={ROUTES.MATCH_HISTORY}
        component={MatchHistoryScreen}
      />
      <Stack.Screen name={ROUTES.ACHIEVEMENTS} component={AchievementsScreen} />
      <Stack.Screen name={ROUTES.SOCIAL_LINKS} component={SocialLinksScreen} />
      <Stack.Screen
        name={ROUTES.PROFILE_SETTINGS}
        component={ProfileSettingsScreen}
      />

      <Stack.Screen
        name={ROUTES.REGISTRATION_OVERVIEW}
        component={RegistrationOverviewScreen}
      />
      <Stack.Screen
        name={ROUTES.SELECT_TEAM_REGISTRATION}
        component={SelectTeamScreen}
      />
      <Stack.Screen
        name={ROUTES.QUICK_CREATE_TEAM}
        component={QuickCreateTeamScreen}
      />
      <Stack.Screen
        name={ROUTES.TEAM_VERIFICATION}
        component={TeamVerificationScreen}
      />
      <Stack.Screen
        name={ROUTES.REGISTRATION_CONFIRMATION}
        component={RegistrationConfirmationScreen}
      />
      <Stack.Screen
        name={ROUTES.REGISTRATION_SUCCESS}
        component={RegistrationSuccessScreen}
      />

      <Stack.Screen name={ROUTES.MATCH_CENTER} component={MatchCenterScreen} />
      <Stack.Screen
        name={ROUTES.TOURNAMENT_BRACKET}
        component={TournamentBracketScreen}
      />
      <Stack.Screen
        name={ROUTES.MATCH_DETAILS_MODAL}
        component={MatchDetailsScreen}
      />
      <Stack.Screen name={ROUTES.LIVE_MATCH} component={LiveMatchScreen} />
      <Stack.Screen name={ROUTES.MATCH_RESULT} component={MatchResultScreen} />
      <Stack.Screen
        name={ROUTES.MATCHES_HISTORY_GLOBAL}
        component={MatchesHistoryScreen}
      />

      <Stack.Screen
        name={ROUTES.NOTIFICATION_CENTER}
        component={NotificationCenterScreen}
      />
      <Stack.Screen
        name={ROUTES.NOTIFICATION_DETAILS}
        component={NotificationDetailsScreen}
      />
      <Stack.Screen
        name={ROUTES.ACTIVITY_FEED}
        component={ActivityFeedScreen}
      />
      <Stack.Screen
        name={ROUTES.NOTIFICATION_SETTINGS}
        component={NotificationSettingsScreen}
      />

      <Stack.Screen
        name={ROUTES.WALLET_DASHBOARD}
        component={WalletDashboardScreen}
      />
      <Stack.Screen
        name={ROUTES.WALLET_TRANSACTIONS}
        component={WalletTransactionsScreen}
      />
      <Stack.Screen
        name={ROUTES.REWARDS_CENTER}
        component={RewardsCenterScreen}
      />
      <Stack.Screen name={ROUTES.COINS_XP} component={CoinsXPScreen} />
      <Stack.Screen
        name={ROUTES.WITHDRAW_FUNDS}
        component={WithdrawFundsScreen}
      />
      <Stack.Screen name={ROUTES.ADD_BALANCE} component={AddBalanceScreen} />
      <Stack.Screen
        name={ROUTES.PAYMENT_METHODS}
        component={PaymentMethodsScreen}
      />
      <Stack.Screen
        name={ROUTES.TRANSACTION_DETAILS}
        component={TransactionDetailsScreen}
      />
      <Stack.Screen
        name={ROUTES.REFERRAL_REWARDS}
        component={ReferralRewardsScreen}
      />

      <Stack.Screen
        name={ROUTES.SETTINGS_HOME}
        component={SettingsHomeScreen}
      />
      <Stack.Screen
        name={ROUTES.ACCOUNT_SETTINGS}
        component={AccountSettingsScreen}
      />
      <Stack.Screen
        name={ROUTES.SECURITY_SETTINGS}
        component={SecurityScreen}
      />
      <Stack.Screen name={ROUTES.PRIVACY_SETTINGS} component={PrivacyScreen} />
      <Stack.Screen
        name={ROUTES.APPEARANCE_SETTINGS}
        component={AppearanceScreen}
      />
      <Stack.Screen
        name={ROUTES.LANGUAGE_REGION_SETTINGS}
        component={LanguageRegionScreen}
      />
      <Stack.Screen
        name={ROUTES.CONNECTED_ACCOUNTS_SETTINGS}
        component={ConnectedAccountsScreen}
      />
      <Stack.Screen
        name={ROUTES.DEVICES_SESSIONS_SETTINGS}
        component={DevicesSessionsScreen}
      />
      <Stack.Screen
        name={ROUTES.DATA_STORAGE_SETTINGS}
        component={DataStorageScreen}
      />
      <Stack.Screen
        name={ROUTES.HELP_SUPPORT_SETTINGS}
        component={HelpSupportScreen}
      />
      <Stack.Screen name={ROUTES.ABOUT_SETTINGS} component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
