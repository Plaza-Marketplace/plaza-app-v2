import { Animated, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Color from '@/constants/Color';
import useGetCommunityCollectionItems from '@/hooks/queries/useGetCommunityCollectionItems';
import { useLocalSearchParams } from 'expo-router';
import Spacing from '@/constants/Spacing';
import ProductCard from '@/components/Product/ProductCard';
import { Tabs } from 'react-native-collapsible-tab-view';

const CommunityCollection = () => {
  const { communityId: id } = useLocalSearchParams<{ communityId: string }>();
  const communityId = parseInt(id);

  const { data: communityCollectionItems, error } =
    useGetCommunityCollectionItems(communityId);

  if (error) return <Text>{error.message}</Text>;

  if (!communityCollectionItems) return <Text>Loading...</Text>;

  return (
    <Tabs.FlatList
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
  );
};

export default CommunityCollection;

const styles = StyleSheet.create({
  productCardContainer: {
    flex: 1 / 2,
    padding: 4,
  },
  columnContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: Spacing.SPACING_2,
    gap: Spacing.SPACING_2,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'green',
  },
  separator: {
    height: 16,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.SPACING_2,
  },
  info: {
    backgroundColor: Color.SURFACE_PRIMARY,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
});
