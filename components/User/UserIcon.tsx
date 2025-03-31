import { Image } from 'expo-image';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import Color from '@/constants/Color';

interface UserIconProps {
  profileImageUrl: string | null;
}

const UserIcon: FC<UserIconProps> = ({ profileImageUrl }) => {
  return <Image source={{ uri: profileImageUrl }} style={styles.user} />;
};

export default UserIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.GREY_100,
  },
  user: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Color.GREY_200,
  },
});
