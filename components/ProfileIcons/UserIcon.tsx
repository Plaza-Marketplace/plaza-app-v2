import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const DEFAULT_PROFILE_ICON_URL =
  'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';

interface UserIconProps {
  url?: string;
}

const UserIcon: FC<UserIconProps> = ({ url }) => {
  return url ? (
    <Image source={{ uri: url }} style={styles.user} />
  ) : (
    <Image source={{ uri: DEFAULT_PROFILE_ICON_URL }} style={styles.user} />
  );
};

export default UserIcon;

const styles = StyleSheet.create({
  user: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
