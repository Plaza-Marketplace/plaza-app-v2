import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FC, useState } from 'react';
import FeedBottomSheet from './FeedBottomSheet';
import { StyleSheet, View } from 'react-native';
import StandardText from '../Texts/StandardText';
import PressableOpacity from '../Buttons/PressableOpacity';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import SellerTab from './SellerTab';
import ProductTab from './ProductTab';

interface ReviewModalProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const ReviewModal: FC<ReviewModalProps> = ({ bottomSheetRef }) => {
  const [sellerTabSelected, setSellerTabSelected] = useState(true);

  return (
    <FeedBottomSheet bottomSheetRef={bottomSheetRef}>
      <View style={styles.container}>
        <PressableOpacity
          onPress={() => setSellerTabSelected(true)}
          style={{ borderBottomWidth: sellerTabSelected ? 2 : 0 }}
        >
          <StandardText>Seller</StandardText>
        </PressableOpacity>
        <PressableOpacity
          onPress={() => setSellerTabSelected(false)}
          style={{ borderBottomWidth: sellerTabSelected ? 0 : 2 }}
        >
          <StandardText>Product</StandardText>
        </PressableOpacity>
      </View>
      {sellerTabSelected ? <SellerTab /> : <ProductTab />}
    </FeedBottomSheet>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.SPACING_1,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
});
