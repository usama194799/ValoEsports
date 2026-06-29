import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Body, Label} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Spacing} from '../../../theme/spacing';
import {SectionContainer} from './LayoutContainers';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({description}) => {
  const [expanded, setExpanded] = useState(false);

  const textStyle = useAnimatedStyle(() => ({
    maxHeight: expanded ? withTiming(1000) : withTiming(60),
  }));

  return (
    <SectionContainer title="About Tournament">
      <Animated.View style={[styles.textWrapper, textStyle]}>
        <Body style={styles.text}>{description}</Body>
      </Animated.View>
      <TouchableOpacity
        style={styles.readMoreBtn}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}>
        <Label style={styles.readMoreText}>
          {expanded ? 'Read Less' : 'Read More'}
        </Label>
      </TouchableOpacity>
    </SectionContainer>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    overflow: 'hidden',
  },
  text: {
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  readMoreBtn: {
    marginTop: Spacing.sm,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
});

export default React.memo(DescriptionSection);
