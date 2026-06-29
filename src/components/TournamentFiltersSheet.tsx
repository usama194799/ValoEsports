import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Heading, Label, Subheading } from './Typography';
import { Colors } from '../theme/colors';
import { Radius } from '../theme/radius';
import { Spacing } from '../theme/spacing';
import { wp } from '../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TournamentFiltersSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
}

const FilterSection: React.FC<{
  title: string;
  options: string[];
  selected?: string;
}> = ({ title, options, selected }) => (
  <View style={styles.section}>
    <Label style={styles.sectionTitle}>{title}</Label>
    <View style={styles.chipRow}>
      {options.map(opt => (
        <TouchableOpacity
          key={opt}
          style={[styles.chip, selected === opt && styles.chipSelected]}
        >
          <Label
            style={[
              styles.chipLabel,
              selected === opt && styles.chipLabelSelected,
            ]}
          >
            {opt}
          </Label>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const TournamentFiltersSheet: React.FC<TournamentFiltersSheetProps> = ({
  visible,
  onClose,
  onApply,
  onReset,
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(1000); // start off screen
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 150 });
      translateY.value = withTiming(0, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      translateY.value = withTiming(1000, { duration: 200 });
    }
  }, [visible, opacity, translateY]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: visible ? 'auto' : 'none',
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[styles.overlay, overlayStyle]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />

      <Animated.View
        style={[
          styles.sheet,
          { paddingBottom: insets.bottom || Spacing.xl },
          sheetStyle,
        ]}
      >
        <View style={styles.header}>
          <Heading style={styles.headerTitle}>Filters</Heading>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Icon name="close" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <FilterSection
            title="Game"
            options={['All', 'PUBG', 'Valorant', 'Free Fire', 'COD']}
            selected="All"
          />
          <FilterSection
            title="Status"
            options={['Upcoming', 'Live', 'Open', 'Completed']}
            selected="Open"
          />
          <FilterSection
            title="Entry Fee"
            options={['Any', 'Free', 'Premium']}
            selected="Any"
          />
          <FilterSection
            title="Prize Pool"
            options={['Any', 'High to Low', 'Low to High']}
            selected="High to Low"
          />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
            <Label style={styles.resetText}>Reset</Label>
          </TouchableOpacity>
          <TouchableOpacity onPress={onApply} style={styles.applyBtn}>
            <Subheading style={styles.applyText}>Apply Filters</Subheading>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.neutral.overlay,
  },
  sheet: {
    backgroundColor: Colors.dark.cardAlt,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    maxHeight: '80%',
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: Colors.text.muted,
    marginBottom: Spacing.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  chipSelected: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  chipLabel: {
    fontSize: 12,
  },
  chipLabelSelected: {
    color: Colors.text.primary,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
    borderTopWidth: 0.5,
    borderTopColor: Colors.neutral.borderLight,
  },
  resetBtn: {
    flex: 1,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  resetText: {
    fontWeight: '600',
  },
  applyBtn: {
    flex: 2,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    fontWeight: '700',
  },
});

export default React.memo(TournamentFiltersSheet);
