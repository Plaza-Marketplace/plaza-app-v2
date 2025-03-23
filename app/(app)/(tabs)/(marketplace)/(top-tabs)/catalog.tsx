import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import PlazaTextInput from '@/components/PlazaTextInput';
import CatalogCategory from '@/components/Catalog/CatalogCategory';
import Spacing from '@/constants/Spacing';
import StandardText from '@/components/Texts/StandardText';
import useGetCommunityCollectionItems from '@/hooks/queries/useGetCommunityCollectionItems';
import ProductCard from '@/components/Product/ProductCard';

const mock = [
  {
    id: 1,
    name: 'Jewelry',
  },
  {
    id: 2,
    name: 'Pottery',
  },
  {
    id: 3,
    name: 'Knitting',
  },
  {
    id: 4,
    name: 'Glass',
  },
  {
    id: 5,
    name: 'Keyboards',
  },
  {
    id: 6,
    name: 'Something',
  },
];

const Catalog = () => {
  const inset = useSafeAreaInsets();
  const { data: communityCollectionItems, error } =
    useGetCommunityCollectionItems(7);
  if (error) return <Text>{error.message}</Text>;

  if (!communityCollectionItems) return <Text>Loading...</Text>;

  return (
    <View style={[styles.container, { marginTop: inset.top }]}>
      <PlazaTextInput style={styles.input} placeholder="Search for products" />
      <FlatList
        style={{
          marginTop: Spacing.SPACING_2,
          flex: 1,
          flexGrow: 1,
          width: '95%',
        }}
        ListHeaderComponent={
          <FlatList
            data={mock}
            horizontal={true}
            style={{ marginBottom: Spacing.SPACING_2, flexGrow: 0 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                style={{
                  marginRight:
                    index === mock.length - 1 ? 0 : Spacing.SPACING_3,
                }}
              >
                <CatalogCategory name={item.name} icon={null} />
              </View>
            )}
            keyExtractor={(item) => `${item.id}`} // Ensure unique key for each item
          />
        }
        data={communityCollectionItems}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.productCardContainer}>
            <ProductCard
              name={item.product.name}
              username={'poop'}
              thumbnailUrl={item.product.imageUrls[0]}
              rating={4}
              price={item.product.price}
            />
          </View>
        )}
        contentContainerStyle={{
          columnGap: Spacing.SPACING_1,
          rowGap: Spacing.SPACING_1,
        }}
      />
    </View>
  );
};

export default Catalog;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '95%',
  },
  productCardContainer: {
    flex: 1 / 2,
  },
});
