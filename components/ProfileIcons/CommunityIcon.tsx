import { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

const DEFAULT_PROFILE_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';
const DEFAULT_SIZE = 32;

interface CommunityIconProps {
  url?: string;
  size?: number;
}

const CommunityIcon: FC<CommunityIconProps> = ({
  url,
  size = DEFAULT_SIZE,
}) => {
  const sizeStyles = {
    width: size,
    height: size,
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
