import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';
import { PaymentMethod } from '../constants/mockData';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  onSetDefault?: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  method,
  isSelected,
  onPress,
  onRemove,
  onSetDefault,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      <View style={styles.contentRow}>
        <View style={styles.iconContainer}>
          <Icon name={method.icon} size={28} color={Colors.text.primary} />
        </View>

        <View style={styles.detailsContainer}>
          <Heading style={styles.typeText}>{method.type}</Heading>
          <Subheading style={styles.detailsText}>{method.details}</Subheading>
        </View>

        {method.isDefault && (
          <View style={styles.defaultBadge}>
            <Label style={styles.defaultText}>PRIMARY</Label>
          </View>
        )}

        {isSelected && (
          <Icon name="check-circle" size={24} color={Colors.primary.main} />
        )}
      </View>

      {(onRemove || onSetDefault) && (
        <View style={styles.actionsRow}>
          {!method.isDefault && onSetDefault && (
            <TouchableOpacity onPress={onSetDefault}>
              <Label style={styles.actionText}>Set as Default</Label>
            </TouchableOpacity>
          )}
          {onRemove && (
            <TouchableOpacity onPress={onRemove}>
              <Label style={styles.removeText}>Remove</Label>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    marginBottom: Spacing.md,
  },
  cardSelected: {
    borderColor: Colors.primary.main,
    backgroundColor: 'rgba(254, 74, 93, 0.05)',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 40,
    backgroundColor: Colors.dark.background,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    marginRight: Spacing.md,
  },
  detailsContainer: {
    flex: 1,
  },
  typeText: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  detailsText: {
    fontSize: 13,
    color: Colors.text.muted,
    marginTop: 2,
    letterSpacing: 1,
  },
  defaultBadge: {
    backgroundColor: Colors.success.transparent.medium, // Success with opacity
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.xs,
    marginRight: Spacing.md,
  },
  defaultText: {
    color: Colors.gaming.open,
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.neutral.border,
    gap: Spacing.lg,
  },
  actionText: {
    color: Colors.text.primary,
    fontSize: 13,
    fontWeight: '500',
  },
  removeText: {
    color: Colors.gaming.live, // Error red
    fontSize: 13,
    fontWeight: '500',
  },
});

export default PaymentMethodCard;
