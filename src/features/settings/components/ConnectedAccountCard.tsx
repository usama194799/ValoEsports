import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Subheading } from '../../../components/Typography';
import { ConnectedAccount } from '../constants/mockData';

interface ConnectedAccountCardProps {
  account: ConnectedAccount;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

const ConnectedAccountCard: React.FC<ConnectedAccountCardProps> = ({
  account,
  onConnect,
  onDisconnect,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <View
          style={[styles.iconContainer, { backgroundColor: account.color }]}
        >
          <Icon name={account.icon} size={24} color={Colors.neutral.white} />
        </View>
        <View style={styles.textContainer}>
          <Heading style={styles.provider}>{account.provider}</Heading>
          {account.isConnected && account.username ? (
            <Subheading style={styles.username}>{account.username}</Subheading>
          ) : (
            <Subheading style={styles.notConnectedText}>
              Not Connected
            </Subheading>
          )}
        </View>
      </View>

      {account.isConnected ? (
        <TouchableOpacity
          style={styles.disconnectBtn}
          onPress={onDisconnect}
          activeOpacity={0.8}
        >
          <Heading style={styles.disconnectText}>Disconnect</Heading>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.connectBtn}
          onPress={onConnect}
          activeOpacity={0.8}
        >
          <Heading style={styles.connectText}>Connect</Heading>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginBottom: Spacing.md,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  provider: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  username: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  notConnectedText: {
    fontSize: 13,
    color: Colors.text.muted,
    marginTop: 2,
  },
  connectBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    backgroundColor: Colors.primary.main,
    borderRadius: Radius.md,
  },
  connectText: {
    fontSize: 13,
    color: Colors.dark.background, // Ensure inverse is readable against primary.main
  },
  disconnectBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  disconnectText: {
    fontSize: 13,
    color: Colors.text.primary,
  },
});

export default ConnectedAccountCard;
