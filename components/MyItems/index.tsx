import { View } from 'react-native';
import { useGetMyItemsProducts, useGetNextMyItemsProducts } from './hooks';
import { FlatList } from 'react-native-gesture-handler';
import ProductCard from '../Product/ProductCard';
import { FC } from 'react';
import HeadingText from '../Texts/HeadingText';

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
  const getNextMyItemsProducts = useGetNextMyItemsProducts(data);

  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={{ padding: 4 }}
      data={data}
      ListHeaderComponent={
        <View style={{ padding: 8 }}>
          <HeadingText variant="h5-bold">My Items</HeadingText>
        </View>
      }
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
