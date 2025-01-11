import Radius from '@/constants/Radius';
import { Image, StyleSheet } from 'react-native';
import PressableOpacity from '../Buttons/PressableOpacity';
import { FC } from 'react';

interface ProductIconProps {
  onPress: () => void;
}

const ProductIcon: FC<ProductIconProps> = ({ onPress }) => {
  return (
    <PressableOpacity onPress={onPress}>
      <Image
        source={{
          uri: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
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
