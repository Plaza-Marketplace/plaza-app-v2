import { Image } from 'expo-image';
import PressableOpacity from '../Buttons/PressableOpacity';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import Color from '@/constants/Color';

interface UserIconProps {
  profileImageUrl: string | null;
}

const UserIcon: FC<UserIconProps> = ({ profileImageUrl }) => {
  return (
    <PressableOpacity style={styles.container}>
      <Image source={{ uri: profileImageUrl }} style={styles.user} />
    </PressableOpacity>
  );
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
  },
});
