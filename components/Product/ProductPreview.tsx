import ProductIcon from '../Product/ProductIcon';
import { FC, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductModal from '../Product/ProductModal';
import { StyleSheet, View } from 'react-native';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import PressableOpacity from '../Buttons/PressableOpacity';
import { formatPrice } from '@/utils/currency';
import BodyText from '../Texts/BodyText';

interface ProductPreviewProps {
  id: Id;

  thumbnailUrl: Url | null;

  name: string;

  price: number;
}

const ProductPreview: FC<ProductPreviewProps> = ({
  id,
  thumbnailUrl,
  name,
  price,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <PressableOpacity
        style={styles.container}
        onPress={() => {
          bottomSheetRef.current?.present();
        }}
      >
        <ProductIcon imageUrl={thumbnailUrl ?? undefined} />

        <View style={styles.textContainer}>
          <BodyText variant="md-bold" color={Color.WHITE} numberOfLines={2}>
            {name}
          </BodyText>

          <BodyText variant="sm" numberOfLines={1} color={Color.WHITE}>
            {formatPrice(price || 0)}
          </BodyText>
        </View>
      </PressableOpacity>
      <ProductModal bottomSheetRef={bottomSheetRef} id={id} />
    </>
  );
};

export default ProductPreview;

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
