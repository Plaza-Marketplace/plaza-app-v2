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
import HeadingText from '../Texts/HeadingText';

interface ReviewModalProps {
  seller: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
  product: Product;
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const ReviewModal: FC<ReviewModalProps> = ({
  seller,
  product,
  bottomSheetRef,
}) => {
  return (
    <FeedBottomSheet bottomSheetRef={bottomSheetRef}>
      <View style={styles.container}>
        <HeadingText variant={'h6-bold'}>Seller Reviews</HeadingText>
      </View>
      <SellerTab seller={seller} />
    </FeedBottomSheet>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.SPACING_1,
  },
});
