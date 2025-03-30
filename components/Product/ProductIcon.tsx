import Radius from '@/constants/Radius';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import PressableOpacity from '../Buttons/PressableOpacity';
import { FC } from 'react';
import Color from '@/constants/Color';

interface ProductIconProps {
  imageUrl?: Url;
  onPress?: () => void;
  size?: number;
}

const ProductIcon: FC<ProductIconProps> = ({
  imageUrl,
  onPress,
  size = 64,
}) => {
  return (
    <View>
      {imageUrl ? (
        <Image
          source={{
            uri: imageUrl,
          }}
          style={[styles.image, { width: size, height: size }]}
        />
      ) : (
        <View
          style={[
            styles.image,
            {
              backgroundColor: Color.SURFACE_SECONDARY,
              width: size,
              height: size,
            },
          ]}
        />
      )}
    </View>
  );
};

export default ProductIcon;

const styles = StyleSheet.create({
  image: {
    borderRadius: Radius.ROUNDED,
  },
});
