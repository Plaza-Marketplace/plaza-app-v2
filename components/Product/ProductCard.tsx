import { Image } from 'expo-image';
import { FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import HeadingText from '../Texts/HeadingText';
import BodyText from '../Texts/BodyText';
import { formatPrice } from '@/utils/currency';
import ProfileIcon from '../ProfileIcon';
import Color from '@/constants/Color';
import Rating from '../Rating';
import ProductModal from './ProductModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PressableOpacity from '../Buttons/PressableOpacity';

interface ProductCardProps {
  id: Id;

  name: string;

  username?: string;

  thumbnailUrl: Url | null;

  rating?: number;

  price: number;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  username,
  thumbnailUrl,
  rating,
  price,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePress = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <PressableOpacity style={styles.container} onPress={handlePress}>
        <Image source={{ uri: thumbnailUrl }} style={styles.productImage} />
        <View style={styles.infoContainer}>
          <HeadingText variant="h6" numberOfLines={1}>
            {name}
          </HeadingText>
          <BodyText variant="lg">{formatPrice(price)}</BodyText>
          {username !== undefined && rating !== undefined && (
            <View style={styles.sellerContainer}>
              <View style={styles.seller}>
                <ProfileIcon variant="user" size={24} />
                <BodyText
                  variant="md-medium"
                  numberOfLines={1}
                  style={{ flexShrink: 1 }}
                >
                  {username}
                </BodyText>
              </View>
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
  },
  seller: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
