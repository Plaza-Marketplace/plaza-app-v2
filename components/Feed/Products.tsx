import { StyleSheet, View } from 'react-native';
import Spacing from '@/constants/Spacing';
import FeedProduct from './FeedProduct';
import { FC } from 'react';

interface ProductsProps {
  products: Product[];
}

const Products: FC<ProductsProps> = ({ products }) => {
  console.log(products);
  return (
    <View style={styles.container}>
      {products.map((product) => (
        <FeedProduct key={product.id} product={product} />
      ))}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.SPACING_1,
  },
});
