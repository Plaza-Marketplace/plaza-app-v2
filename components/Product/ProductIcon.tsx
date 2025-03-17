import Radius from '@/constants/Radius';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import PressableOpacity from '../Buttons/PressableOpacity';
import { FC } from 'react';
import Color from '@/constants/Color';

interface ProductIconProps {
  imageUrl?: Url;
}

const ProductIcon: FC<ProductIconProps> = ({ imageUrl }) => {
  return (
    <View>
      {imageUrl ? (
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.image}
        />
      ) : (
        <View
          style={[styles.image, { backgroundColor: Color.SURFACE_SECONDARY }]}
        />
      )}
    </View>
  );
};

export default ProductIcon;

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: Radius.ROUNDED,
  },
});
