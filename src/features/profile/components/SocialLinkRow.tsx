import React from 'react';
import {StyleSheet, TouchableOpacity, View, Linking, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Label, Subheading} from '../../../components/Typography';
import {Colors} from '../../../theme/colors';
import {Radius} from '../../../theme/radius';
import {Spacing} from '../../../theme/spacing';
import {SocialLink} from '../types/profile';
import Clipboard from '@react-native-clipboard/clipboard';

interface SocialLinkRowProps {
  social: SocialLink;
}

const SocialLinkRow: React.FC<SocialLinkRowProps> = ({social}) => {
  const getSocialConfig = () => {
    switch (social.platform) {
      case 'discord': return {icon: 'discord', color: '#5865F2', name: 'Discord'};
      case 'youtube': return {icon: 'youtube', color: '#FF0000', name: 'YouTube'};
      case 'twitter': return {icon: 'twitter', color: '#1DA1F2', name: 'X (Twitter)'};
      case 'twitch': return {icon: 'twitch', color: '#9146FF', name: 'Twitch'};
      case 'instagram': return {icon: 'instagram', color: '#E1306C', name: 'Instagram'};
      case 'facebook': return {icon: 'facebook', color: '#1877F2', name: 'Facebook'};
      default: return {icon: 'link', color: Colors.text.primary, name: 'Link'};
    }
  };

  const {icon, color, name} = getSocialConfig();

  const handlePress = () => {
    if (social.url) {
      Linking.openURL(social.url).catch(() => {
        Alert.alert('Error', 'Could not open link.');
      });
    }
  };

  const handleCopy = () => {
    Clipboard.setString(social.username);
    // In a real app, you might show a toast instead
    Alert.alert('Copied', `${name} username copied to clipboard!`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mainContent}
        onPress={handlePress}
        activeOpacity={0.7}>
        <View style={[styles.iconWrapper, {backgroundColor: color + '20'}]}>
          <Icon name={icon} size={20} color={color} />
        </View>
        <View style={styles.textContainer}>
          <Subheading style={styles.platformName}>{name}</Subheading>
          <Label style={styles.username}>{social.username}</Label>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.copyBtn}
        onPress={handleCopy}
        activeOpacity={0.7}>
        <Icon name="content-copy" size={20} color={Colors.text.muted} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: Radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  platformName: {
    fontSize: 14,
    marginBottom: 2,
  },
  username: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  copyBtn: {
    padding: Spacing.sm,
  },
});

export default React.memo(SocialLinkRow);
