import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Heading, Label } from '../../../components/Typography';

import ConnectedAccountCard from '../components/ConnectedAccountCard';
import { MOCK_CONNECTED_ACCOUNTS } from '../constants/mockData';

const ConnectedAccountsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState(MOCK_CONNECTED_ACCOUNTS);

  const handleConnect = (id: string) => {
    // Mock connecting
    setAccounts(prev =>
      prev.map(acc =>
        acc.id === id
          ? { ...acc, isConnected: true, username: 'LinkedUser123' }
          : acc,
      ),
    );
  };

  const handleDisconnect = (id: string) => {
    // Mock disconnecting
    setAccounts(prev =>
      prev.map(acc =>
        acc.id === id ? { ...acc, isConnected: false, username: '' } : acc,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.appBarTitle}>Connected Accounts</Heading>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerTextContainer}>
          <Label style={styles.headerDesc}>
            Connect your favorite gaming platforms and social accounts to easily
            find friends and sync your stats.
          </Label>
        </View>

        <View style={styles.listContainer}>
          {accounts.map(acc => (
            <ConnectedAccountCard
              key={acc.id}
              account={acc}
              onConnect={() => handleConnect(acc.id)}
              onDisconnect={() => handleDisconnect(acc.id)}
            />
          ))}
        </View>
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
    backgroundColor: Colors.dark.surface,
  },
  iconBtn: {
    padding: Spacing.sm,
  },
  appBarTitle: {
    fontSize: 18,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  headerTextContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  headerDesc: {
    color: Colors.text.secondary,
    lineHeight: 20,
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
  },
});

export default ConnectedAccountsScreen;
