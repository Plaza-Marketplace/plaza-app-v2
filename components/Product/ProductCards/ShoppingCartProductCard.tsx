import CaptionText from '@/components/Texts/CaptionText';
import StandardText from '@/components/Texts/StandardText';
import Spacing from '@/constants/Spacing';
import { FC } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { formatPrice } from '@/utils/currency';
import productCardStyles from '@/components/PostCards/ProductCards/styles';

interface ShoppingCartProductCardProps {
  product: Product;
  isChecked?: boolean;
  showCheckbox: boolean;
  onPress?: () => void;
  orderStatus?: OrderStatus;
}

const ShoppingCartProductCard: FC<ShoppingCartProductCardProps> = ({
  product,
  isChecked = false,
  showCheckbox,
  onPress,
  orderStatus,
}) => {
  return (
    <View style={productCardStyles.shadow}>
      <View style={styles.container}>
        {product.imageUrls.length > 0 ? (
          <Image
            source={{
              uri:
                product.imageUrls.length > 0
                  ? product.imageUrls[0]
                  : 'https://via.placeholder.com/150',
            }}
            style={styles.image}
          />
        ) : (
          <View
            style={[styles.image, { backgroundColor: Color.SURFACE_SECONDARY }]}
          />
        )}
        <View style={styles.productInfo}>
          <StandardText>{product.name}</StandardText>
          <CaptionText>{formatPrice(product.price)}</CaptionText>
          <CaptionText>{orderStatus}</CaptionText>
        </View>
        {showCheckbox && (
          <PressableOpacity onPress={onPress}>
            <Checkbox value={isChecked} style={{ pointerEvents: 'none' }} />
          </PressableOpacity>
        )}
      </View>
    </View>
  );
};

export default ShoppingCartProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Spacing.SPACING_3,
    backgroundColor: Color.SURFACE_PRIMARY,
    borderRadius: Radius.ROUNDED,
    overflow: 'hidden',
  },
  productInfo: {
    flex: 1,
    height: '100%',
    padding: Spacing.SPACING_3,
    gap: Spacing.SPACING_2,
  },
  image: {
    width: 100,
    height: 100,
  },
});
