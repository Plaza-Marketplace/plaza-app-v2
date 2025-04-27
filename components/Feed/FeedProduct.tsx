import ProductIcon from '../Product/ProductIcon';
import { FC, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductModal from '../Product/ProductModal';
import { StyleSheet, View } from 'react-native';
import { Event, track } from '@/analytics/utils';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import PressableOpacity from '../Buttons/PressableOpacity';
import { formatPrice } from '@/utils/currency';
import BodyText from '../Texts/BodyText';

interface ProductProps {
  videoId: Id;
  sellerId: Id;
  product: Product;
}

const FeedProduct: FC<ProductProps> = ({ videoId, sellerId, product }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <PressableOpacity
        style={styles.container}
        onPress={() => {
          track(Event.CLICKED_PRODUCT_ICON, {
            productId: product.id,
            videoId: videoId,
          });
          bottomSheetRef.current?.present();
        }}
      >
        <ProductIcon
          imageUrl={
            product.imageUrls.length > 0 ? product.imageUrls[0] : undefined
          }
        />

        <View style={styles.textContainer}>
          <BodyText variant="md-bold" color={Color.WHITE} numberOfLines={2}>
            {product.name}
          </BodyText>

          <BodyText variant="sm" numberOfLines={1} color={Color.WHITE}>
            {formatPrice(product.price || 0)}
          </BodyText>
        </View>
      </PressableOpacity>
      <ProductModal bottomSheetRef={bottomSheetRef} id={product.id} />
    </>
  );
};

export default FeedProduct;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 8,
    backgroundColor: Color.NEUTRALS_750,
    borderRadius: Radius.ROUNDED,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 160,
  },
  textContainer: {
    flexShrink: 1,
    gap: 2,
  },
});
