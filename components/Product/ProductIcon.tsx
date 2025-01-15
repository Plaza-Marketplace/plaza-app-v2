import Radius from '@/constants/Radius';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import PressableOpacity from '../Buttons/PressableOpacity';
import { FC } from 'react';
import Color from '@/constants/Color';

interface ProductIconProps {
  imageUrl?: Url;
  onPress?: () => void;
}

const ProductIcon: FC<ProductIconProps> = ({ imageUrl, onPress }) => {
  return (
    <PressableOpacity onPress={onPress}>
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
    </PressableOpacity>
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
