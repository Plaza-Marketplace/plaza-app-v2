import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import { useGetProductsBySellerId } from '@/hooks/queries/useGetProductsBySellerId';
import Spacing from '@/constants/Spacing';
import ProfileProduct from '@/components/ProfileProduct';

interface ProfileProductsProps {
  userId: Id;
}

const ProfileProducts: FC<ProfileProductsProps> = ({ userId }) => {
  const width = Dimensions.get('window').width;
  const { data: products, isLoading } = useGetProductsBySellerId(userId);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Tabs.FlatList
        style={{ flex: 1 }}
        numColumns={2}
        data={products}
        contentContainerStyle={{
          gap: Spacing.SPACING_3,
        }}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              width: width / 2,
              height: width / 2,
            }}
          >
            <ProfileProduct product={item} />
          </View>
        )}
      />
    </>
  );
};

export default ProfileProducts;

const styles = StyleSheet.create({});
