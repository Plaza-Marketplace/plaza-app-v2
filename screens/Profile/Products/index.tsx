import { Text, View } from 'react-native';
import { FC } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import Spacing from '@/constants/Spacing';
import useGetProductsBySellerId from './useGetProductsBySellerId';
import ProductCard from '@/components/Product/ProductCard';

interface ProductsProps {
  userId: Id;
}

const Products: FC<ProductsProps> = ({ userId }) => {
  const { data: products, isLoading } = useGetProductsBySellerId(userId);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Tabs.FlatList
      numColumns={2}
      data={products}
      contentContainerStyle={{
        gap: Spacing.SPACING_3,
      }}
      renderItem={({ item }) => (
        <View style={{ flex: 1 / 2, padding: 4 }}>
          <ProductCard
            id={item.id}
            name={item.name}
            thumbnailUrl={item.thumbnailUrl}
            price={item.price}
          />
        </View>
      )}
    />
  );
};

export default Products;
