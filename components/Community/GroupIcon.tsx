import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { Image } from 'expo-image';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';

interface GroupIconProps {
  id: Id;
  url: Url | null;
  size: number;
  isPressable?: boolean;
}

const GroupIcon: FC<GroupIconProps> = ({
  id,
  url,
  size = 32,
  isPressable = true,
}) => {
  const handlePress = () => {
    router.push({
      pathname: '/community',
      params: { id },
    });
  };

  return isPressable ? (
    <PressableOpacity
      disabled={!isPressable}
      onPress={handlePress}
      style={{
        backgroundColor: Color.GREY_100,
        borderRadius: Radius.ROUNDED,
        alignSelf: 'flex-start',
      }}
    >
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
    </PressableOpacity>
  ) : (
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
