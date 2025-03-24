import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { Image } from 'expo-image';
import { FC } from 'react';
import { StyleSheet } from 'react-native';

interface GroupIconProps {
  url: string | null;
  size: number;
}

const GroupIcon: FC<GroupIconProps> = ({ url, size = 32 }) => {
  return (
    <Image
      source={{ uri: url }}
      style={[
        styles.container,
        {
          width: size,
          height: size,
        },
      ]}
    />
  );
};

export default GroupIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.GREY_100,
    borderRadius: Radius.ROUNDED,
  },
});
