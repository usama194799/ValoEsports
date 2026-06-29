import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Heading, Label} from './Typography';
import {Colors} from '../theme/colors';
import {Spacing} from '../theme/spacing';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'database-remove-outline',
  title,
  message,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name={icon} size={48} color={Colors.text.muted} />
      </View>
      <Heading style={styles.title}>{title}</Heading>
      <Label style={styles.message}>{message}</Label>
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
    backgroundColor: Colors.dark.surface,
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
    paddingHorizontal: Spacing.xl,
  },
});

export default React.memo(EmptyState);
