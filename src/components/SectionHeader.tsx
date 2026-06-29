import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Heading, Label} from './Typography';
import {Colors} from '../theme/colors';
import {Spacing} from '../theme/spacing';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({title, onSeeAll}) => {
  return (
    <View style={styles.container}>
      <Heading style={styles.title}>{title}</Heading>
      <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
        <Label style={styles.seeAll}>See all</Label>
      </TouchableOpacity>
    </View>
  );
};

const SectionHeaderMemo = React.memo(SectionHeader);
export default SectionHeaderMemo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  seeAll: {
    color: Colors.text.secondary,
    fontSize: 11,
    letterSpacing: 1.2,
  },
});

