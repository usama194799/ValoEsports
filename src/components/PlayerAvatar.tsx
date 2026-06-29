import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../theme/colors';
import {Radius} from '../theme/radius';

interface PlayerAvatarProps {
  uri: string;
  size?: number;
  borderWidth?: number;
  borderColor?: string;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  uri,
  size = 42,
  borderWidth = 2,
  borderColor = Colors.gaming.avatarRing,
}) => {
  const imageSource = React.useMemo(() => ({uri}), [uri]);

  return (
    <View
      style={[
        styles.ring,
        {
          width: size + borderWidth * 2,
          height: size + borderWidth * 2,
          borderRadius: (size + borderWidth * 2) / 2,
          borderWidth,
          borderColor,
        },
      ]}>
      <Image
        source={imageSource}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
  },
  avatar: {
    backgroundColor: Colors.dark.surface,
  },
});

export default React.memo(PlayerAvatar);
