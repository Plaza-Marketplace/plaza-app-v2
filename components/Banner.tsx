import { Dimensions, StyleSheet, View } from 'react-native';
import { ImageBackground } from 'expo-image';
import { FC, PropsWithChildren } from 'react';
import Radius from '@/constants/Radius';
import Color from '@/constants/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface BannerProps extends PropsWithChildren {
  backgroundUrl: string | null;
  onPress: () => void;
}

const Banner: FC<BannerProps> = ({ backgroundUrl, onPress, children }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground style={{ flex: 1 }} source={{ uri: backgroundUrl }}>
        <View style={styles.overlay}>{children}</View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    height: 200,
    borderRadius: Radius.LG,
    overflow: 'hidden',
    backgroundColor: Color.GREY_100,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    padding: 16,
    pointerEvents: 'none',
  },
});
