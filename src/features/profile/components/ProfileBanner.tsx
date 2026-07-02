import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ViewStyle,
  StyleProp,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Heading,
  Label,
  Subheading,
  Body,
} from '../../../components/Typography';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ProfileBannerProps {
  coverUrl?: string;
  avatarUrl?: string;
  fullName: string;
  username: string;
  level: number;
  isVerified?: boolean;
  country: string;
  currentRank: string;
  bio?: string;
  style?: StyleProp<ViewStyle>;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({
  coverUrl,
  avatarUrl,
  fullName,
  username,
  level,
  isVerified,
  country,
  currentRank,
  bio,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ImageBackground
        source={{ uri: coverUrl || 'https://via.placeholder.com/1024x400' }}
        style={styles.coverImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', Colors.dark.background]}
          style={styles.gradient}
        />
      </ImageBackground>

      <View style={styles.profileInfoContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: avatarUrl || 'https://via.placeholder.com/256' }}
            style={styles.avatar}
          />
          <View style={styles.levelBadge}>
            <Label style={styles.levelText}>{level}</Label>
          </View>
        </View>

        <View style={styles.nameSection}>
          <View style={styles.nameRow}>
            <Heading style={styles.fullName}>{fullName}</Heading>
            {isVerified && (
              <Icon
                name="check-decagram"
                size={20}
                color={Colors.primary.main}
              />
            )}
          </View>
          <Subheading style={styles.username}>@{username}</Subheading>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Icon
              name="map-marker-outline"
              size={16}
              color={Colors.text.secondary}
            />
            <Label style={styles.metaText}>{country}</Label>
          </View>
          <View style={styles.metaDot} />
          <View style={styles.metaItem}>
            <Icon name="star-outline" size={16} color={Colors.warning.main} />
            <Label style={styles.metaText}>{currentRank}</Label>
          </View>
        </View>

        {bio && (
          <Body style={styles.bioText} numberOfLines={3}>
            {bio}
          </Body>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.dark.background,
  },
  coverImage: {
    width: '100%',
    height: 180,
  },
  gradient: {
    ...(StyleSheet.absoluteFill as any),
  },
  profileInfoContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
    marginTop: -50,
  },
  avatarWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.dark.background,
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
  levelText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  nameSection: {
    marginBottom: Spacing.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  fullName: {
    fontSize: 24,
  },
  username: {
    fontSize: 14,
    color: Colors.text.muted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.text.muted,
    marginHorizontal: Spacing.sm,
  },
  metaText: {
    color: Colors.text.secondary,
    fontSize: 13,
  },
  bioText: {
    color: Colors.text.secondary,
    lineHeight: 22,
  },
});

export default React.memo(ProfileBanner);
