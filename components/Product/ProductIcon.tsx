import Radius from '@/constants/Radius';
import { Image, StyleSheet } from 'react-native';
import PressableOpacity from '../Buttons/PressableOpacity';
import { FC } from 'react';

interface ProductIconProps {
  imageUrl: Url;
  onPress: () => void;
}

const ProductIcon: FC<ProductIconProps> = ({ imageUrl, onPress }) => {
  return (
    <PressableOpacity onPress={onPress}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.image}
      />
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
