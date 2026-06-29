import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {ROUTES} from './routes';

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

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
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
      <Stack.Screen name={ROUTES.INVITE_PLAYERS} component={InvitePlayersScreen} />
      <Stack.Screen name={ROUTES.JOIN_TEAM} component={JoinTeamScreen} />
      <Stack.Screen name={ROUTES.TEAM_MEMBERS} component={TeamMembersScreen} />
      <Stack.Screen name={ROUTES.TEAM_REQUESTS} component={TeamRequestsScreen} />
      <Stack.Screen name={ROUTES.TEAM_SETTINGS} component={TeamSettingsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
