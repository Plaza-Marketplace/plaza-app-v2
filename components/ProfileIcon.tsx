import { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

const DEFAULT_PROFILE_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';

interface ProfileIconProps {
  url?: string;
}

const ProfileIcon: FC<ProfileIconProps> = ({ url }) => {
  return url ? (
    <Image source={{ uri: url }} style={styles.image} />
  ) : (
    <Image source={{ uri: DEFAULT_PROFILE_ICON_URL }} style={styles.image} />
  );
};

export default ProfileIcon;

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
