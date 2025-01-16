import { StyleSheet, View } from 'react-native';
import Spacing from '@/constants/Spacing';
import FeedProduct from './FeedProduct';
import { FC } from 'react';

interface ProductsProps {
  videoId: Id;
  sellerId: Id;
  products: Product[];
}

const Products: FC<ProductsProps> = ({ videoId, sellerId, products }) => {
  return (
    <View style={styles.container}>
      {products.map((product) => (
        <FeedProduct
          key={product.id}
          sellerId={sellerId}
          product={product}
          videoId={videoId}
        />
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
