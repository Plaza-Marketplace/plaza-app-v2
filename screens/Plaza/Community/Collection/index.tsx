import { StyleSheet, Text, View } from 'react-native';
import { FC, useRef } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import PlazaButton from '@/components/Buttons/PlazaButton';
import useGetCollectionProducts from './useGetCollectionProducts';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SelectProductModal from '@/components/Community/SelectProductModal';
import { useAddProductsToCollection } from '@/components/Community/SelectProductModal/hooks';
import CollectionCard from '@/components/Community/CollectionCard';

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

  console.log(communityCollectionItems);

  if (!communityCollectionItems) return <Text>Loading...</Text>;

  return (
    <>
      <View style={{ flex: 1 }}>
        <Tabs.FlatList
          data={communityCollectionItems}
          numColumns={2}
          renderItem={({ item }) => (
            <CollectionCard communityId={communityId} item={item} />
          )}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 72 }}
          keyExtractor={(item) => item.id.toString()}
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
