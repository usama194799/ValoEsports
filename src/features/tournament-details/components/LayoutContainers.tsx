import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Radius} from '../../../theme/radius';
import {Shadows} from '../../../theme/shadow';
import {Spacing} from '../../../theme/spacing';

export const SectionContainer: React.FC<ViewProps & {title?: string; headerRight?: React.ReactNode}> = ({
  children,
  title,
  headerRight,
  style,
  ...props
}) => (
  <View style={[styles.sectionContainer, style]} {...props}>
    {(title || headerRight) && (
      <View style={styles.sectionHeader}>
        {title && <Heading style={styles.sectionTitle}>{title}</Heading>}
        {headerRight}
      </View>
    )}
    {children}
  </View>
);

export const CardContainer: React.FC<ViewProps> = ({children, style, ...props}) => (
  <View style={[styles.cardContainer, Shadows.card, style]} {...props}>
    {children}
  </View>
);

export const InfoRow: React.FC<ViewProps> = ({children, style, ...props}) => (
  <View style={[styles.infoRow, style]} {...props}>
    {children}
  </View>
);

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
  highlight?: boolean;
}

export const InfoItem: React.FC<InfoItemProps> = React.memo(({icon, label, value, highlight}) => (
  <View style={styles.infoItem}>
    <View style={styles.iconWrapper}>
      <Icon
        name={icon}
        size={20}
        color={highlight ? Colors.gaming.rankGold : Colors.text.secondary}
      />
    </View>
    <View style={styles.infoText}>
      <Label style={styles.label} numberOfLines={1}>
        {label}
      </Label>
      <Subheading
        style={[styles.value, highlight && {color: Colors.gaming.rankGold}]}
        // Removing numberOfLines to allow long values to wrap correctly per user request
      >
        {value}
      </Subheading>
    </View>
  </View>
));

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: Spacing.xl, // 20dp global horizontal padding
    marginBottom: Spacing.xxl, // 24dp vertical spacing between sections
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
  },
  cardContainer: {
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    padding: Spacing.xl, // 20dp internal padding
    borderWidth: 0.5,
    borderColor: Colors.neutral.border,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    gap: Spacing.md,
  },
  infoItem: {
    flex: 1, // Strict 50% width
    flexDirection: 'row',
    alignItems: 'center', // Vertically centered
    gap: Spacing.sm,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoText: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    color: Colors.text.muted,
    marginBottom: 2,
  },
  value: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.text.primary,
  },
});
