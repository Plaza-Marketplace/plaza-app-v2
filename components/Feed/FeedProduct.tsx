import ProductIcon from '../Product/ProductIcon';
import { FC, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductModal from './ProductModal';
import { StyleSheet, View } from 'react-native';
import { Event, track } from '@/analytics/utils';

interface ProductProps {
  videoId: Id;
  sellerId: Id;
  product: Product;
}

const FeedProduct: FC<ProductProps> = ({ videoId, sellerId, product }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <View style={styles.shadowContainer}>
        <ProductIcon
          imageUrl={
            product.imageUrls.length > 0 ? product.imageUrls[0] : undefined
          }
          onPress={() => {
            track(Event.CLICKED_PRODUCT_ICON, {
              productId: product.id,
              videoId: videoId,
            });
            bottomSheetRef.current?.present();
          }}
        />
      </View>
      <ProductModal
        bottomSheetRef={bottomSheetRef}
        sellerId={sellerId}
        product={product}
      />
    </>
  );
};

export default FeedProduct;

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
