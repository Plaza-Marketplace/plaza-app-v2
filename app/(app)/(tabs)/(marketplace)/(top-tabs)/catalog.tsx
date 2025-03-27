import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import SearchBar from '@/components/SearchBar';
import AllTags from '@/components/Tags/AllTags';

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
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Search products"
            onChangeText={(text) => console.log(text)} // Placeholder for search functionality
          />
        </View>
      </View>
      <ScrollView style={{ marginTop: Spacing.SPACING_2 }}>
        <AllTags />
        <FlatList
          style={{
            marginTop: Spacing.SPACING_2,
            flex: 1,
            flexGrow: 1,
            width: '100%',
            paddingHorizontal: Spacing.SPACING_3,
          }}
          scrollEnabled={false}
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
        />
      </ScrollView>
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
  searchContainer: {
    gap: 16,
    paddingTop: Spacing.SPACING_2,
    width: '100%',
  },
  searchBar: {
    paddingHorizontal: 16,
  },
});
