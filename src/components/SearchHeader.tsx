import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../theme/colors';
import {Radius} from '../theme/radius';
import {Spacing} from '../theme/spacing';
import {Shadows} from '../theme/shadow';

interface SearchHeaderProps {
  placeholder?: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  editable?: boolean;
  onVoicePress?: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  placeholder = 'Search tournaments...',
  onPress,
  value,
  onChangeText,
  autoFocus = false,
  editable = true,
  onVoicePress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={!onPress}
        style={[styles.searchBox, Shadows.card]}>
        <Icon name="magnify" size={22} color={Colors.text.muted} style={styles.icon} />
        
        <View pointerEvents={editable ? 'auto' : 'none'} style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Colors.text.muted}
            value={value}
            onChangeText={onChangeText}
            autoFocus={autoFocus}
            editable={editable}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity onPress={onVoicePress} style={styles.voiceBtn}>
          <Icon name="microphone-outline" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.lg,
    height: 48,
    paddingHorizontal: Spacing.md,
    borderWidth: 0.5,
    borderColor: Colors.neutral.border,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 14,
    paddingVertical: 0,
  },
  voiceBtn: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
});

export default React.memo(SearchHeader);
