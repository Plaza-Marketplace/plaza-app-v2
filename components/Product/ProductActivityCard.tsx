import { StyleSheet, View } from 'react-native';
import PressableOpacity from '../Buttons/PressableOpacity';
import ProductIcon from './ProductIcon';
import BodyText from '../Texts/BodyText';
import { FC, useRef } from 'react';
import SellerInfo from '../SellerInfo';
import ProductModal from './ProductModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';

interface ProductActivityCardProps {
  id: Id;

  name: string;

  thumbnailUrl: Url | null;

  seller: {
    id: Id;

    username: string;

    profilePictureUrl: Url | null;

    averageRating: number;
  };
}

const ProductActivityCard: FC<ProductActivityCardProps> = ({
  id,
  name,
  thumbnailUrl,
  seller,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePress = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <PressableOpacity style={styles.container} onPress={handlePress}>
        <ProductIcon imageUrl={thumbnailUrl ?? undefined} />
        <View>
          <BodyText variant="md-medium">{name}</BodyText>
          <SellerInfo
            id={seller.id}
            username={seller.username}
            profilePictureUrl={seller.profilePictureUrl}
            averageRating={seller.averageRating}
          />
        </View>
      </PressableOpacity>
      <ProductModal bottomSheetRef={bottomSheetRef} id={id} />
    </>
  );
};

export default ProductActivityCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Color.NEUTRALS_100,
    borderRadius: Radius.ROUNDED,
    padding: 8,
  },
});
