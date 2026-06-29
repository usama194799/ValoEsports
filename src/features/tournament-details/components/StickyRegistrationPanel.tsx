import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DetailedTournament} from '../types';
import {Heading, Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Radius} from '../../../theme/radius';
import {Spacing} from '../../../theme/spacing';

interface StickyRegistrationPanelProps {
  tournament: DetailedTournament;
  onRegisterPress: () => void;
}

const StickyRegistrationPanel: React.FC<StickyRegistrationPanelProps> = ({
  tournament,
  onRegisterPress,
}) => {
  const insets = useSafeAreaInsets();
  
  const getButtonState = () => {
    switch (tournament.status) {
      case 'open':
        return {
          label: 'Register Now',
          bg: Colors.primary.main,
          text: Colors.text.primary,
          onPress: onRegisterPress,
          icon: 'chevron-right',
          disabled: false,
        };
      case 'live':
        return {
          label: 'Watch Live',
          bg: '#9146FF', // Twitch purple
          text: Colors.text.primary,
          onPress: () => console.log('Watch Live'),
          icon: 'play',
          disabled: false,
        };
      case 'closed':
      default:
        return {
          label: 'Tournament Ended',
          bg: Colors.dark.surface,
          text: Colors.text.muted,
          onPress: undefined,
          icon: 'lock',
          disabled: true,
        };
    }
  };

  const btnState = getButtonState();

  return (
    <View
      style={[
        styles.container,
        {paddingBottom: insets.bottom || Spacing.md},
      ]}>
      <View style={styles.leftCol}>
        <View style={styles.feeWrapper}>
          <Label style={styles.feeLabel}>Entry Fee</Label>
          <Heading style={styles.feeValue} numberOfLines={1}>{tournament.entryFee}</Heading>
        </View>
        <View style={styles.feeWrapper}>
          <Label style={styles.feeLabel}>Prize Pool</Label>
          <Subheading style={styles.prizeValue} numberOfLines={1}>{tournament.prizePool}</Subheading>
        </View>
      </View>
      
      <TouchableOpacity
        style={[styles.btn, {backgroundColor: btnState.bg}]}
        onPress={btnState.onPress}
        disabled={btnState.disabled}
        activeOpacity={0.8}>
        <Subheading style={[styles.btnText, {color: btnState.text}]}>
          {btnState.label}
        </Subheading>
        {btnState.icon && (
          <Icon name={btnState.icon} size={20} color={btnState.text} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(13, 13, 26, 0.95)',
    borderTopWidth: 0.5,
    borderTopColor: Colors.neutral.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    zIndex: 100,
  },
  leftCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingRight: Spacing.md,
  },
  feeWrapper: {
    justifyContent: 'center',
  },
  feeLabel: {
    fontSize: 10,
    color: Colors.text.muted,
    marginBottom: 2,
  },
  feeValue: {
    fontSize: 18,
    color: Colors.text.primary,
  },
  prizeValue: {
    fontSize: 15,
    color: Colors.gaming.rankGold,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
    gap: Spacing.xs,
    minWidth: 140, // Keeps button width responsive but enforces minimum
  },
  btnText: {
    fontWeight: '700',
  },
});

export default React.memo(StickyRegistrationPanel);
