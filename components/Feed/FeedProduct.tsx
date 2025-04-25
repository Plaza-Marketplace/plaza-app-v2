import ProductIcon from '../Product/ProductIcon';
import { FC, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductModal from '../Product/ProductModal';
import { StyleSheet, View } from 'react-native';
import { Event, track } from '@/analytics/utils';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import BoldStandardText from '../Texts/BoldStandardText';
import StandardText from '../Texts/StandardText';
import PressableOpacity from '../Buttons/PressableOpacity';
import { formatPrice } from '@/utils/currency';

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
          <BoldStandardText style={styles.text}>
            {product.name}
          </BoldStandardText>

          <StandardText
            style={styles.text}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {formatPrice(product.price || 0)}
          </StandardText>
        </View>
      </PressableOpacity>
      <ProductModal bottomSheetRef={bottomSheetRef} id={product.id} />
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
  container: {
    padding: Spacing.SPACING_2,
    backgroundColor: Color.NEUTRALS_750,
    borderRadius: Radius.ROUNDED,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Color.NEUTRALS_WHITE,
  },
  textContainer: {
    marginLeft: Spacing.SPACING_2,
    flexGrow: 1,
    maxWidth: 100,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
});
