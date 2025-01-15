import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const DEFAULT_PROFILE_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';
const DEFAULT_SIZE = 32;

interface CommunityIconProps {
  url?: string;
  size?: number;
  borderStyle?: any;
}

const CommunityIcon: FC<CommunityIconProps> = ({
  url,
  size = DEFAULT_SIZE,
  borderStyle,
}) => {
  const sizeStyles = {
    width: size,
    height: size,
    ...borderStyle,
  };

  return url ? (
    <Image source={{ uri: url }} style={[styles.community, sizeStyles]} />
  ) : (
    <Image
      source={{ uri: DEFAULT_PROFILE_ICON_URL }}
      style={[styles.community, sizeStyles]}
    />
  );
};

export default CommunityIcon;

const styles = StyleSheet.create({
  community: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
});
