import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { FC, RefObject } from 'react';
import HeadingText from '../Texts/HeadingText';
import ProfileIcon from '../ProfileIcon';
import BodyText from '../Texts/BodyText';
import { StyleSheet, View } from 'react-native';
import Rating from '../Rating';
import FeedBottomSheet from '../Feed/FeedBottomSheet';

interface ProductModalProps {
  id: Id;

  name: string;

  username: string;

  profilePictureUrl: string | null;

  rating: number;

  description: string;

  bottomSheetRef: RefObject<BottomSheetModal>;
}

const ProductModal: FC<ProductModalProps> = ({
  id,
  name,
  username,
  profilePictureUrl,
  rating,
  description,
  bottomSheetRef,
}) => {
  return (
    <FeedBottomSheet bottomSheetRef={bottomSheetRef}>
      {/* <BottomSheetView> */}
      <HeadingText variant="h5-bold">{name}</HeadingText>
      <View style={styles.infoContainer}>
        <ProfileIcon
          variant="user"
          size={32}
          url={profilePictureUrl ?? undefined}
        />
        <View>
          <BodyText variant="md">{username}</BodyText>
          <Rating rating={rating} />
        </View>
      </View>
      <BodyText variant="md">{description}</BodyText>
      <HeadingText variant="h6-bold">Seller Reviews</HeadingText>
      {/* </BottomSheetView> */}
    </FeedBottomSheet>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
  },
});
