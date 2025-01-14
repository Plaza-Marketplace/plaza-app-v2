import CaptionText from '@/components/Texts/CaptionText';
import StandardText from '@/components/Texts/StandardText';
import Spacing from '@/constants/Spacing';
import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { formatPrice } from '@/utils/currency';

interface ShoppingCartProductCardProps {
  product: Product;
  isChecked?: boolean;
  showCheckbox: boolean;
}

const ShoppingCartProductCard: FC<ShoppingCartProductCardProps> = ({
  product,
  isChecked = false,
  showCheckbox,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            product.imageUrls.length > 0
              ? product.imageUrls[0]
              : 'https://via.placeholder.com/150',
        }}
        style={styles.image}
      />
      <View style={styles.productInfo}>
        <StandardText>{product.name}</StandardText>
        <CaptionText>{formatPrice(product.price)}</CaptionText>
      </View>
      {showCheckbox && (
        <PressableOpacity>
          <Checkbox value={isChecked} />
        </PressableOpacity>
      )}
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
