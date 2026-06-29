import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label, Subheading } from '../../../components/Typography';

interface SheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const BaseSheet: React.FC<SheetProps> = ({
  visible,
  onClose,
  title,
  content,
}) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Heading style={styles.title}>{title}</Heading>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="close" size={24} color={Colors.text.muted} />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <Subheading style={styles.contentText}>{content}</Subheading>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export const TermsAndConditionsSheet: React.FC<
  Omit<SheetProps, 'title'>
> = props => {
  return <BaseSheet {...props} title="Terms & Conditions" />;
};

export const TournamentRulesSheet: React.FC<
  Omit<SheetProps, 'title'>
> = props => {
  return <BaseSheet {...props} title="Tournament Rules" />;
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.neutral.blackTransparent.medium,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.dark.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    height: height * 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.borderLight,
  },
  title: {
    fontSize: 18,
    color: Colors.text.primary,
  },
  closeBtn: {
    padding: Spacing.xs,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  contentText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
});
