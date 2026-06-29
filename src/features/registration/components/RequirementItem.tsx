import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Label, Subheading } from '../../../components/Typography';

interface RequirementItemProps {
  label: string;
  isMet: boolean;
  errorDetail?: string;
}

const RequirementItem: React.FC<RequirementItemProps> = ({
  label,
  isMet,
  errorDetail,
}) => {
  return (
    <View
      style={[
        styles.container,
        isMet ? styles.containerMet : styles.containerFailed,
      ]}
    >
      <View style={styles.iconContainer}>
        {isMet ? (
          <Icon name="check-circle" size={24} color={Colors.success.main} />
        ) : (
          <Icon name="close-circle" size={24} color={Colors.danger.main} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Subheading
          style={[styles.label, !isMet && { color: Colors.danger.main }]}
        >
          {label}
        </Subheading>
        {!isMet && errorDetail && (
          <Label style={styles.errorDetail}>{errorDetail}</Label>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
  },
  containerMet: {
    backgroundColor: Colors.success.transparent.light,
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  containerFailed: {
    backgroundColor: Colors.danger.transparent.light,
    borderColor: Colors.danger.transparent.dark,
  },
  iconContainer: {
    marginRight: Spacing.md,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  errorDetail: {
    fontSize: 12,
    color: Colors.danger.main,
    marginTop: 2,
    opacity: 0.8,
  },
});

export default React.memo(RequirementItem);
