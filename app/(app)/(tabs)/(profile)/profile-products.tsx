import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import ProductPreview from '@/components/ProductPreview';
import { useGetProductsBySellerId } from '@/hooks/queries/useGetProductsBySellerId';
import LinkItemsProduct from '@/components/LinkItemsProduct';

const mocking = Array.from({ length: 10 });

interface ProfileProductsProps {
  userId: Id;
}

const ProfileProducts: FC<ProfileProductsProps> = ({ userId }) => {
  const width = Dimensions.get('window').width;
  const { data: products, isLoading } = useGetProductsBySellerId(userId);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  console.log(products);

  return (
    <Tabs.FlatList
      style={{ flex: 1 }}
      numColumns={3}
      data={products}
      renderItem={({ item }) => (
        <View
          style={{
            width: width / 2,
            height: width / 2,
          }}
        >
          <LinkItemsProduct
            product={item}
            isSelected={false}
            onPress={() => {
              console.log('meow');
            }}
          />
        </View>
      )}
    />
  );
};

export default ProfileProducts;

const styles = StyleSheet.create({});
