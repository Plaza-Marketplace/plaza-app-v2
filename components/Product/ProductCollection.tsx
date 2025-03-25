import { FC } from 'react';
import { FlatList, View } from 'react-native';
import ProductCard from './ProductCard';
import { StyleSheet } from 'react-native';

interface ProductCollectionProps {
  products: {
    id: Id;
    name: string;
    username: string;
    thumbnailUrl: string;
    price: number;
  }[];
}

const ProductCollection: FC<ProductCollectionProps> = ({ products }) => {
  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.productCardContainer}>
          <ProductCard
            id={item.id}
            name={item.name}
            username={item.username}
            thumbnailUrl={item.thumbnailUrl}
            rating={4}
            price={item.price}
          />
        </View>
      )}
    />
  );
};

export default ProductCollection;

const styles = StyleSheet.create({
  productCardContainer: {
    flex: 1 / 2,
    padding: 4,
  },
});
