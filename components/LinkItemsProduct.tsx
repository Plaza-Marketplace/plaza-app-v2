import { useState } from 'react';
import PressableOpacity from './Buttons/PressableOpacity';
import { StyleSheet } from 'react-native';
import ProductShowcase from './PostCards/ProductCards/ProductShowcase';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';

const LinkItemsProduct = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <PressableOpacity
      style={[
        styles.container,
        {
          backgroundColor: pressed ? Color.SURFACE_PRIMARY : 'transparent',
        },
      ]}
      onPress={() => setPressed(!pressed)}
    >
      <ProductShowcase />
    </PressableOpacity>
  );
};

export default LinkItemsProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing.SPACING_2,
    padding: Spacing.SPACING_2,
  },
});
