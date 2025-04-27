import { FC, useEffect, useRef, useState } from 'react';
import { Image as ExpoImage } from 'expo-image';
import { Image, StyleSheet, View } from 'react-native';
import CaptionText from '../Texts/CaptionText';
import Color from '@/constants/Color';
import PressableOpacity from '../Buttons/PressableOpacity';
import ProductModal from '../Feed/ProductModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Event, track } from '@/analytics/utils';
import Spacing from '@/constants/Spacing';
import HeaderText from '../Texts/HeaderText';
import ProfileIcon from '../ProfileIcon';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

interface CommunityCollectionItemPostProps {
  communityCollectionItem: CommunityCollectionItem;
}

const CommunityCollectionItemPost: FC<CommunityCollectionItemPostProps> = ({
  communityCollectionItem,
}) => {
  const productModalRef = useRef<BottomSheetModal>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    Image.getSize(
      communityCollectionItem.product.imageUrls[0],
      (width, height) => {
        setAspectRatio(width / height);
      }
    );
  }, [communityCollectionItem.product.imageUrls[0]]);

  if (!aspectRatio) return null;

  const handleOnPress = () => {
    productModalRef.current?.present();
    track(Event.CLICKED_COLLECTION_ITEM, {
      communityCollectionItemId: communityCollectionItem.id,
    });
  };

  return (
    <>
      <PressableOpacity style={styles.container} onPress={handleOnPress}>
        <ExpoImage
          source={{ uri: communityCollectionItem.product.imageUrls[0] }}
          style={[styles.image, { aspectRatio }]}
        />

        <View style={styles.caption}>
          <HeaderText fontSize={16}>
            {communityCollectionItem.product.name}
          </HeaderText>
          <StarRatingDisplay rating={5} starSize={16} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <ProfileIcon variant="user" size={20} />
            <CaptionText>by Jane Doe</CaptionText>
          </View>
        </View>
      </PressableOpacity>
      <ProductModal
        product={communityCollectionItem.product}
        sellerId={communityCollectionItem.product.sellerId}
        bottomSheetRef={productModalRef}
      />
    </>
  );
};

export default CommunityCollectionItemPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.SURFACE_PRIMARY,
    gap: 4,
    borderRadius: Spacing.SPACING_2,
  },
  image: {
    width: '100%',
    height: null,
    backgroundColor: Color.SURFACE_SECONDARY,
    borderRadius: 8,
  },
  caption: {
    padding: 8,
    gap: 4,
  },
});
