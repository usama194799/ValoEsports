import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading } from '../components/Typography';
import { Colors } from '../theme/colors';

const NotificationsScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <Heading style={styles.text}>Notifications (Placeholder)</Heading>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.text.muted,
  },
});

export default NotificationsScreen;
