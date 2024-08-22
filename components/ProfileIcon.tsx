import { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

const DEFAULT_PROFILE_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';

interface ProfileIconProps {
  url?: string;
  variant?: 'user' | 'community';
}

const ProfileIcon: FC<ProfileIconProps> = ({ url, variant = 'user' }) => {
  const style = variant === 'user' ? styles.user : styles.community;

  return url ? (
    <Image source={{ uri: url }} style={style} />
  ) : (
    <Image source={{ uri: DEFAULT_PROFILE_ICON_URL }} style={style} />
  );
};

export default ProfileIcon;

const styles = StyleSheet.create({
  user: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  community: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
});
