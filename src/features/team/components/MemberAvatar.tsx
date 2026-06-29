import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../theme/colors';

interface MemberAvatarProps {
  url: string;
  size?: number;
  online?: boolean;
  role?: 'captain' | 'co-leader' | 'player' | 'reserve';
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({
  url,
  size = 48,
  online,
  role,
}) => {
  const getRoleColor = () => {
    switch (role) {
      case 'captain':
        return Colors.gaming.rankGold;
      case 'co-leader':
        return Colors.gaming.rankSilver;
      default:
        return 'transparent';
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{ uri: url }}
        style={[styles.avatar, { borderRadius: size / 2 }]}
      />

      {role && (role === 'captain' || role === 'co-leader') && (
        <View style={styles.roleBadge}>
          <Icon name="star" size={10} color={getRoleColor()} />
        </View>
      )}

      {online !== undefined && (
        <View
          style={[
            styles.onlineIndicator,
            {
              backgroundColor: online ? Colors.success.main : Colors.text.muted,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.dark.surface,
  },
  roleBadge: {
    position: 'absolute',
    top: -4,
    left: -4,
    backgroundColor: Colors.dark.surface,
    borderRadius: 8,
    padding: 2,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
});

export default React.memo(MemberAvatar);
