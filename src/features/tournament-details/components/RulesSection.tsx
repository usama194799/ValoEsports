import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  measure,
  useAnimatedRef,
  runOnUI,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TournamentRule} from '../types';
import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Radius} from '../../../theme/radius';
import {Spacing} from '../../../theme/spacing';
import {SectionContainer} from './LayoutContainers';

interface RulesSectionProps {
  rules: TournamentRule[];
}

const AccordionItem: React.FC<{rule: TournamentRule; index: number}> = ({rule, index}) => {
  const [expanded, setExpanded] = useState(false);
  const listRef = useAnimatedRef<Animated.View>();
  const heightValue = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(heightValue.value, {duration: 300}),
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
    opacity: withTiming(expanded ? 1 : 0, {duration: 300}),
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: withTiming(expanded ? '180deg' : '0deg', {duration: 200})}],
  }));

  const toggle = () => {
    if (expanded) {
      heightValue.value = 0;
      setExpanded(false);
    } else {
      runOnUI(() => {
        'worklet';
        const measurement = measure(listRef);
        if (measurement) {
          heightValue.value = measurement.height;
        }
      })();
      setExpanded(true);
    }
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggle}
        activeOpacity={0.8}>
        <View style={styles.headerLeft}>
          <View style={styles.numberBadge}>
            <Label style={styles.numberText}>{index + 1}</Label>
          </View>
          <Subheading style={styles.ruleTitle}>{rule.title}</Subheading>
        </View>
        <Animated.View style={iconStyle}>
          <Icon name="chevron-down" size={20} color={Colors.text.primary} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.bodyContainer, bodyStyle]}>
        <Animated.View
          ref={listRef}
          style={styles.bodyContent}
          onLayout={e => {
            if (expanded) {
              heightValue.value = e.nativeEvent.layout.height;
            }
          }}>
          <Label style={styles.ruleContent}>{rule.content}</Label>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const RulesSection: React.FC<RulesSectionProps> = ({rules}) => {
  return (
    <SectionContainer title="Rules & Regulations">
      <View style={styles.rulesList}>
        {rules.map((rule, index) => (
          <AccordionItem key={rule.id} rule={rule} index={index} />
        ))}
      </View>
    </SectionContainer>
  );
};

const styles = StyleSheet.create({
  // container removed; SectionContainer provides padding
  rulesList: {
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: Radius.lg,
    borderWidth: 0.5,
    borderColor: Colors.neutral.borderLight,
    overflow: 'hidden',
  },
  accordionContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.borderLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.dark.surfaceLight,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: Spacing.md,
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary.glow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  numberText: {
    color: Colors.primary.main,
    fontWeight: '700',
    fontSize: 12,
  },
  ruleTitle: {
    fontSize: 14,
  },
  bodyContainer: {
    overflow: 'hidden',
  },
  bodyContent: {
    position: 'absolute',
    padding: Spacing.md,
    width: '100%',
  },
  ruleContent: {
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});

export default React.memo(RulesSection);
