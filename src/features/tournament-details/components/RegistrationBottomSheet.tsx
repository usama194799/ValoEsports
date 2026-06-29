import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DetailedTournament} from '../types';
import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Radius} from '../../../theme/radius';
import {Spacing} from '../../../theme/spacing';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface RegistrationBottomSheetProps {
  visible: boolean;
  tournament: DetailedTournament;
  onClose: () => void;
  onConfirm: () => void;
}

const RegistrationBottomSheet: React.FC<RegistrationBottomSheetProps> = ({
  visible,
  tournament,
  onClose,
  onConfirm,
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(1000);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, {duration: 150});
      translateY.value = withTiming(0, {duration: 200});
    } else {
      opacity.value = withTiming(0, {duration: 150});
      translateY.value = withTiming(1000, {duration: 200});
    }
  }, [visible, opacity, translateY]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: visible ? 'auto' : 'none',
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents={visible ? 'auto' : 'none'}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      
      <Animated.View style={[styles.sheet, {paddingBottom: insets.bottom || Spacing.xl}, sheetStyle]}>
        <View style={styles.header}>
          <Heading style={styles.headerTitle}>Confirm Registration</Heading>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Icon name="close" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Subheading style={styles.tournamentName}>{tournament.name}</Subheading>
          
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Label style={styles.summaryLabel}>Format</Label>
              <Label style={styles.summaryValue}>{tournament.format}</Label>
            </View>
            <View style={styles.summaryRow}>
              <Label style={styles.summaryLabel}>Team Size</Label>
              <Label style={styles.summaryValue}>{tournament.teamSize}</Label>
            </View>
            <View style={[styles.summaryRow, styles.summaryRowLast]}>
              <Label style={styles.summaryLabel}>Total Entry Fee</Label>
              <Heading style={styles.summaryTotal}>{tournament.entryFee}</Heading>
            </View>
          </View>
          
          <Label style={styles.disclaimer}>
            By confirming, you agree to the Tournament Rules and the Organizer's Code of Conduct.
          </Label>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Label style={styles.cancelText}>Cancel</Label>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmBtn}>
            <Subheading style={styles.confirmText}>Confirm & Join</Subheading>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 999,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: Colors.neutral.overlay,
  },
  sheet: {
    backgroundColor: Colors.dark.cardAlt,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.borderLight,
  },
  headerTitle: {
    fontSize: 18,
  },
  closeBtn: {
    padding: Spacing.xs,
  },
  content: {
    padding: Spacing.lg,
  },
  tournamentName: {
    fontSize: 16,
    marginBottom: Spacing.lg,
  },
  summaryBox: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  summaryRowLast: {
    marginBottom: 0,
    marginTop: Spacing.xs,
    paddingTop: Spacing.md,
    borderTopWidth: 0.5,
    borderTopColor: Colors.neutral.borderLight,
  },
  summaryLabel: {
    color: Colors.text.muted,
  },
  summaryValue: {
    color: Colors.text.primary,
  },
  summaryTotal: {
    color: Colors.gaming.rankGold,
    fontSize: 18,
  },
  disclaimer: {
    fontSize: 11,
    color: Colors.text.muted,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    gap: Spacing.md,
  },
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  cancelText: {
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 2,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    fontWeight: '700',
  },
});

export default React.memo(RegistrationBottomSheet);
