import { StyleSheet, Text, View } from 'react-native';
import { FC, useRef } from 'react';
import ProductCard from '@/components/Product/ProductCard';
import { Tabs } from 'react-native-collapsible-tab-view';
import PlazaButton from '@/components/Buttons/PlazaButton';
import useGetCollectionProducts from './useGetCollectionProducts';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SelectProductModal from '@/components/Community/SelectProductModal';
import { useAddProductsToCollection } from '@/components/Community/SelectProductModal/hooks';

interface CollectionProps {
  communityId: number;
}

const Collection: FC<CollectionProps> = ({ communityId }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { data: communityCollectionItems, error } =
    useGetCollectionProducts(communityId);
  const { mutate: addProductsToCollection } =
    useAddProductsToCollection(communityId);

  if (error) return <Text>{error.message}</Text>;

  if (!communityCollectionItems) return <Text>Loading...</Text>;

  return (
    <>
      <View style={{ flex: 1 }}>
        <Tabs.FlatList
          data={communityCollectionItems}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.productCardContainer}>
              <ProductCard
                id={item.id}
                name={item.name}
                username={item.seller.username}
                thumbnailUrl={item.thumbnailUrl ?? ''}
                rating={item.seller.averageRating}
                price={item.price}
              />
            </View>
          )}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 72 }}
        />

        <PlazaButton
          title="Add to Collection"
          style={styles.buttonContainer}
          onPress={() => bottomSheetRef.current?.present()}
        />
      </View>
      <SelectProductModal
        multiple
        onSubmit={addProductsToCollection}
        title="Add to Collection"
        bottomSheetRef={bottomSheetRef}
      />
    </>
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
