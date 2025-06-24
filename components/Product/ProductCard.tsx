import { Image } from 'expo-image';
import { FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import HeadingText from '../Texts/HeadingText';
import BodyText from '../Texts/BodyText';
import { formatPrice } from '@/utils/currency';
import Color from '@/constants/Color';
import Rating from '../Rating';
import ProductModal from './ProductModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PressableOpacity from '../Buttons/PressableOpacity';
import UserInfo from '../User/UserInfo';

interface ProductCardProps {
  id: Id;

  name: string;

  profileImageUrl?: Url | null;

  username: string | null;

  displayName: string | null;

  thumbnailUrl: Url | null;

  rating?: number;

  price: number;

  onPress?: (productId: Id) => void;

  isSelected?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  profileImageUrl,
  username,
  displayName,
  thumbnailUrl,
  rating,
  price,
  onPress,
  isSelected,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePress = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <PressableOpacity
        style={[
          styles.container,
          isSelected && { borderColor: Color.PRIMARY_400, borderWidth: 2 },
        ]}
        onPress={onPress ? () => onPress(id) : handlePress}
      >
        <Image source={{ uri: thumbnailUrl }} style={styles.productImage} />
        <View style={styles.infoContainer}>
          <HeadingText variant="h6" numberOfLines={1}>
            {name}
          </HeadingText>
          <BodyText variant="lg">{formatPrice(price)}</BodyText>
          {username !== undefined && rating !== undefined && (
            <View style={styles.sellerContainer}>
              <UserInfo
                username={username ?? ''}
                profilePictureUrl={profileImageUrl ?? null}
                displayName={displayName  ?? ''}
                size={24}
              />
              <Rating rating={rating} />
            </View>
          )}
        </View>
      </PressableOpacity>
      <ProductModal id={id} bottomSheetRef={bottomSheetRef} />
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.NEUTRALS_150,
    backgroundColor: Color.NEUTRALS_WHITE,
    overflow: 'hidden',
  },
  infoContainer: {
    padding: 16,
  },
  productImage: {
    backgroundColor: Color.NEUTRALS_DEFAULT,
    width: '100%',
    aspectRatio: 1,
  },
  sellerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    gap: 4,
  }
});
