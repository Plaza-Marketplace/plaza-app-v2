import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CollectionProduct } from '@/screens/Plaza/Community/Collection/models';
import { Ionicons } from '@expo/vector-icons';
import Color from '@/constants/Color';
import CollectionReportModal from '../Report/CommunityReportModal/CollectionReportModal';
import MenuModal from '../Menu';
import MenuButton from '../Menu/MenuButton';
import ProductCard from '../Product/ProductCard';
import PressableOpacity from '../Buttons/PressableOpacity';
import Spacing from '@/constants/Spacing';

interface CollectionCardProps {
  item: CollectionProduct;
  communityId: Id;
}

const CollectionCard: FC<CollectionCardProps> = ({ item, communityId }) => {
  const menuRef = useRef<BottomSheetModal>(null);
  const reportRef = useRef<BottomSheetModal>(null);
  return (
    <>
      <View style={styles.productCardContainer}>
        <PressableOpacity
          style={{
            position: 'absolute',
            top: Spacing.SPACING_3,
            right: Spacing.SPACING_2,
            zIndex: 1,
          }}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color={Color.WHITE}
            onPress={() => menuRef.current?.present()}
          />
        </PressableOpacity>
        <ProductCard
          id={item.id}
          name={item.name}
          username={item.seller.username}
          displayName={item.seller.displayName}
          thumbnailUrl={item.thumbnailUrl ?? ''}
          rating={item.seller.averageRating}
          price={item.price}
        />
      </View>
      <MenuModal bottomSheetRef={menuRef}>
        <MenuButton
          icon={
            <Ionicons
              name="warning-outline"
              size={20}
              color={Color.NEUTRALS_DEFAULT}
            />
          }
          title="Report Collection Item"
          onPress={() => reportRef.current?.present()}
        />
      </MenuModal>
      <CollectionReportModal
        bottomSheetRef={reportRef}
        communityId={communityId}
        collectionId={item.collectionId}
      />
    </>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  productCardContainer: {
    flex: 1 / 2,
    padding: 4,
  },
});
