import { FC, useEffect, useRef, useState } from 'react';
import { Image as ExpoImage } from 'expo-image';
import { Image, StyleSheet, View } from 'react-native';
import CaptionText from '../Texts/CaptionText';
import Color from '@/constants/Color';
import PressableOpacity from '../Buttons/PressableOpacity';
import ProductModal from '../Feed/ProductModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

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

  return (
    <>
      <PressableOpacity
        style={{ gap: 4 }}
        onPress={() => productModalRef.current?.present()}
      >
        <ExpoImage
          source={{ uri: communityCollectionItem.product.imageUrls[0] }}
          style={[styles.image, { aspectRatio }]}
        />
        {communityCollectionItem.description && (
          <View style={styles.caption}>
            <CaptionText>{communityCollectionItem.description}</CaptionText>
          </View>
        )}
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
  image: {
    width: '100%',
    height: null,
    backgroundColor: Color.SURFACE_SECONDARY,
    borderRadius: 8,
  },
  caption: {
    paddingHorizontal: 4,
  },
});
