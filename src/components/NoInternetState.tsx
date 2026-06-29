import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Heading, Label} from './Typography';
import {Colors} from '../theme/colors';
import {Radius} from '../theme/radius';
import {Spacing} from '../theme/spacing';

interface NoInternetStateProps {
  onRetry: () => void;
}

const NoInternetState: React.FC<NoInternetStateProps> = ({onRetry}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name="wifi-off" size={48} color={Colors.danger.main} />
      </View>
      <Heading style={styles.title}>No Internet Connection</Heading>
      <Label style={styles.message}>
        Please check your network settings and try again.
      </Label>
      
      <TouchableOpacity
        style={styles.retryBtn}
        onPress={onRetry}
        activeOpacity={0.8}>
        <Icon name="refresh" size={18} color={Colors.text.primary} style={styles.btnIcon} />
        <Label style={styles.btnText}>Try Again</Label>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    minHeight: 300,
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 76, 76, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 18,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xl,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.main,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
  },
  btnIcon: {
    marginRight: Spacing.xs,
  },
  btnText: {
    color: Colors.text.primary,
    fontWeight: '700',
  },
});

export default React.memo(NoInternetState);
