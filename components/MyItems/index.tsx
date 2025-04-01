import { View } from 'react-native';
import { useGetMyItemsProducts, useGetNextMyItemsProducts } from './hooks';
import { FlatList } from 'react-native-gesture-handler';
import ProductCard from '../Product/ProductCard';
import { FC } from 'react';

interface MyItemsProps {
  enabled?: boolean;
  onPress?: (productId: Id) => void;
  selectedProductIds?: Id[];
}

const MyItems: FC<MyItemsProps> = ({
  enabled = true,
  onPress,
  selectedProductIds,
}) => {
  const { data, error } = useGetMyItemsProducts(enabled);
  const getNextMyItemsProducts = useGetNextMyItemsProducts();

  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={{ padding: 4 }}
      data={data}
      renderItem={({ item }) => (
        <View style={{ flex: 1 / 2, padding: 4 }}>
          <ProductCard
            id={item.id}
            name={item.name}
            thumbnailUrl={item.thumbnailUrl}
            price={item.price}
            isSelected={selectedProductIds?.includes(item.id)}
            onPress={onPress}
          />
        </View>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={getNextMyItemsProducts}
    />
  );
};

export default MyItems;
