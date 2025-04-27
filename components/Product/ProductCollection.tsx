import { FC } from 'react';
import { FlatList, View } from 'react-native';
import ProductCard from './ProductCard';
import { StyleSheet } from 'react-native';
import HeadingText from '../Texts/HeadingText';
import SearchBar from '../SearchBar';

interface ProductCollectionProps {
  title: string;

  description: string;

  products: {
    id: Id;
    name: string;
    price: number;
    thumbnailUrl: Url | null;

    seller: {
      id: Id;

      username: string;

      averageRating: number;

      profileImageUrl: Url | null;
    };
  }[];
}

const ProductCollection: FC<ProductCollectionProps> = ({
  title,
  description,
  products,
}) => {
  return (
    <FlatList
      data={products}
      numColumns={2}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View style={styles.header}>
          <HeadingText variant="h5-bold">{title}</HeadingText>

          <SearchBar placeholder="Search products" />

          <HeadingText variant="h6">{description}</HeadingText>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.productCardContainer}>
          <ProductCard
            id={item.id}
            name={item.name}
            username={item.seller.username}
            profileImageUrl={item.seller.profileImageUrl}
            thumbnailUrl={item.thumbnailUrl}
            rating={item.seller.averageRating}
            price={item.price}
          />
        </View>
      )}
    />
  );
};

export default ProductCollection;

const styles = StyleSheet.create({
  header: {
    gap: 16,
    paddingBottom: 8,
  },
  productCardContainer: {
    flex: 1 / 2,
    padding: 4,
  },
});
