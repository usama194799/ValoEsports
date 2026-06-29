import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './types';
import { ROUTES } from './routes';
import BottomTabBar from '../components/BottomTabBar';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import TournamentScreen from '../screens/TournamentScreen';
import MyTeamsScreen from '../features/team/screens/MyTeamsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import MyProfileScreen from '../features/profile/screens/MyProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={ROUTES.HOME_TAB} component={DashboardScreen} />
      <Tab.Screen name={ROUTES.TOURNAMENTS_TAB} component={TournamentScreen} />
      <Tab.Screen name={ROUTES.TEAMS_TAB} component={MyTeamsScreen} />
      <Tab.Screen name={ROUTES.LEADERBOARD_TAB} component={LeaderboardScreen} />
      <Tab.Screen name={ROUTES.PROFILE_TAB} component={MyProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
