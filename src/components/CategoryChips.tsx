import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import {Label} from './Typography';
import {Colors} from '../theme/colors';
import {Radius} from '../theme/radius';
import {Spacing} from '../theme/spacing';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const Chip: React.FC<{
  label: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({label, isSelected, onPress}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isSelected ? Colors.primary.main : Colors.dark.surface,
        {duration: 200},
      ),
      borderColor: withTiming(
        isSelected ? Colors.primary.main : Colors.neutral.border,
        {duration: 200},
      ),
    };
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={[styles.chip, animatedStyle]}>
        <Label style={[styles.label, isSelected && styles.labelSelected]}>
          {label}
        </Label>
      </Animated.View>
    </TouchableOpacity>
  );
};

const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  const renderChip = useCallback(
    (category: string) => (
      <Chip
        key={category}
        label={category}
        isSelected={selectedCategory === category}
        onPress={() => onSelect(category)}
      />
    ),
    [selectedCategory, onSelect],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      bounces={false}>
      {categories.map(renderChip)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  label: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  labelSelected: {
    color: Colors.text.primary,
    fontWeight: '700',
  },
});

export default React.memo(CategoryChips);
