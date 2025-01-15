import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Radius from '@/constants/Radius';
import StandardText from '@/components/Texts/StandardText';
import MediumText from '@/components/Texts/MediumText';
import Color from '@/constants/Color';
import ProductImage from './ProductImage';
import Spacing from '@/constants/Spacing';
import productCardStyles from './styles';

interface ProductSelectedShowcase {
  product: Product;
}

const ProductSelectedShowcase: FC<ProductSelectedShowcase> = ({ product }) => {
  return (
    <View style={[styles.card, productCardStyles.shadow]}>
      <ProductImage uri={product.imageUrls[0]} />
      <View style={styles.textContainer}>
        <StandardText>{product.name}</StandardText>
        <MediumText>{`$${product.price}`}</MediumText>
      </View>
    </View>
  );
};

export default ProductSelectedShowcase;

const styles = StyleSheet.create({
  textContainer: {
    gap: Spacing.SPACING_1,
  },
  card: {
    width: '100%',
    padding: 16,
    backgroundColor: Color.SURFACE_PRIMARY,
    borderColor: Color.BORDER_SECONDARY,
    borderRadius: Radius.ROUNDED,
    borderWidth: 1,
    gap: Spacing.SPACING_1,
  },
});
