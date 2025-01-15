import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { FC, useCallback, useRef } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import ProductPreview from '@/components/ProductPreview';
import { useGetProductsBySellerId } from '@/hooks/queries/useGetProductsBySellerId';
import LinkItemsProduct from '@/components/LinkItemsProduct';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductModal from '@/components/Feed/ProductModal';
import Spacing from '@/constants/Spacing';

const mocking = Array.from({ length: 10 });

interface ProfileProductsProps {
  userId: Id;
}

const ProfileProducts: FC<ProfileProductsProps> = ({ userId }) => {
  const width = Dimensions.get('window').width;
  const { data: products, isLoading } = useGetProductsBySellerId(userId);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const onProductPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Tabs.FlatList
        style={{ flex: 1 }}
        numColumns={3}
        data={products}
        contentContainerStyle={{
          gap: Spacing.SPACING_3,
        }}
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
              onPress={onProductPress}
            />
          </View>
        )}
      />
      {products?.map((product) => (
        <ProductModal
          bottomSheetRef={bottomSheetRef}
          sellerId={userId}
          product={product}
        />
      ))}
    </>
  );
};

export default ProfileProducts;

const styles = StyleSheet.create({});
