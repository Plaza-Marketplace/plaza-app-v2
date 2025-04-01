import { FC, useState } from 'react';
import PressableOpacity from './Buttons/PressableOpacity';
import { StyleSheet } from 'react-native';
import ProductShowcase from './PostCards/ProductCards/ProductShowcase';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';

interface LinkItemsProductProps {
  product: Product;
  isSelected: boolean;
  onPress: (product: Product) => void;
}

const LinkItemsProduct: FC<LinkItemsProductProps> = ({
  product,
  isSelected,
  onPress,
}) => {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(!pressed);
    onPress(product);
  };

  return (
    <PressableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? Color.ORANGE_300 : 'transparent',
          // borderWidth: isSelected ? 2 : 0,
        },
      ]}
      onPress={handlePress}
    >
      <ProductShowcase product={product} />
    </PressableOpacity>
  );
};

export default LinkItemsProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing.SPACING_2,
    padding: Spacing.SPACING_2,
    borderRadius: Radius.LG,
  },
});
