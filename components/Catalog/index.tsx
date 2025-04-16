import { FlatList, View } from 'react-native';
import { useGetCatalogProducts, useGetNextCatalogProducts } from './hooks';
import ProductCard from '../Product/ProductCard';
import { FC } from 'react';
import HeadingText from '../Texts/HeadingText';

interface CatalogProps {
  enabled: boolean;
  onPress?: (productId: Id) => void;
  selectedProductIds?: Id[];
}

const Catalog: FC<CatalogProps> = ({
  enabled,
  onPress,
  selectedProductIds,
}) => {
  const { data, error } = useGetCatalogProducts(enabled);
  const getNextCatalogProducts = useGetNextCatalogProducts(data);

  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={{ padding: 4 }}
      data={data}
      ListHeaderComponent={
        <View style={{ padding: 8 }}>
          <HeadingText variant="h5-bold">Product Catalog</HeadingText>
        </View>
      }
      renderItem={({ item }) => (
        <View style={{ flex: 1 / 2, padding: 4 }}>
          <ProductCard
            id={item.id}
            name={item.name}
            profileImageUrl={item.seller.profileImageUrl}
            username={item.seller.username}
            thumbnailUrl={item.thumbnailUrl}
            rating={item.seller.averageRating}
            price={item.price}
            onPress={onPress}
            isSelected={selectedProductIds?.includes(item.id)}
          />
        </View>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={getNextCatalogProducts}
    />
  );
};

export default Catalog;
