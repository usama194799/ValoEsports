import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading, Subheading, Label } from './Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Spacing } from '../theme/spacing';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  title: string;
  message: string;
  date: string;
}

const AnnouncementCard: React.FC<Props> = ({ title, message, date }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Icon name="bullhorn" size={24} color={Colors.primary.main} />
        <View style={styles.titleContainer}>
          <Heading style={styles.title}>{title}</Heading>
          <Label style={styles.date}>{date}</Label>
        </View>
      </View>
      <Subheading style={styles.message}>{message}</Subheading>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    width: 280,
    marginRight: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  titleContainer: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  date: {
    color: Colors.text.muted,
    fontSize: 12,
  },
  message: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
});

export default AnnouncementCard;
