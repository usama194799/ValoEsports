import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import { AuthNavigator } from '../features/auth/navigation/AuthNavigator';
import { useAuth } from '../features/auth/hooks/useAuth';

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
