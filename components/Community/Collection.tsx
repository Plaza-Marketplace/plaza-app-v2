import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import useGetCommunityCollectionItems from '@/hooks/queries/useGetCommunityCollectionItems';
import ProductCard from '@/components/Product/ProductCard';
import { Tabs } from 'react-native-collapsible-tab-view';
import PlazaButton from '../Buttons/PlazaButton';

interface CollectionProps {
  communityId: number;
}

const Collection: FC<CollectionProps> = ({ communityId }) => {
  const { data: communityCollectionItems, error } =
    useGetCommunityCollectionItems(communityId);

  if (error) return <Text>{error.message}</Text>;

  if (!communityCollectionItems) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Tabs.FlatList
        data={communityCollectionItems}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.productCardContainer}>
            <ProductCard
              id={item.product.id}
              name={item.product.name}
              username={'poop'}
              thumbnailUrl={item.product.imageUrls[0]}
              rating={4}
              price={item.product.price}
            />
          </View>
        )}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 72 }}
      />

      <PlazaButton title="Add to Collection" style={styles.buttonContainer} />
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  productCardContainer: {
    flex: 1 / 2,
    padding: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    marginBottom: 8,
    alignSelf: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 30 }, // Shadow position
    shadowOpacity: 0.8, // Shadow transparency
    shadowRadius: 50, // Blur radius
  },
});
