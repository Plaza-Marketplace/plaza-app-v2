import CaptionText from '@/components/Texts/CaptionText';
import Spacing from '@/constants/Spacing';
import { FC } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { formatPrice } from '@/utils/currency';
import HeaderText from '@/components/Texts/HeaderText';
import BoldCaptionText from '@/components/Texts/BoldCaptionText';
import { Ionicons } from '@expo/vector-icons';
import BoldStandardText from '@/components/Texts/BoldStandardText';

interface ShoppingCartProductCardProps {
  product: Product;
  isChecked?: boolean;
  showCheckbox: boolean;
  onPress?: () => void;
  orderStatus?: OrderStatus;
  styles?: ViewStyle;
}

const ShoppingCartProductCard: FC<ShoppingCartProductCardProps> = ({
  product,
  isChecked = false,
  showCheckbox,
  onPress,
  orderStatus,
  styles: passedStyles,
}) => {
  return (
    // <View style={productCardStyles.shadow}>
    //   <View style={styles.container}>
    //     {product.imageUrls.length > 0 ? (
    //       <Image
    //         source={{
    //           uri:
    //             product.imageUrls.length > 0
    //               ? product.imageUrls[0]
    //               : 'https://via.placeholder.com/150',
    //         }}
    //         style={styles.image}
    //       />
    //     ) : (
    //       <View
    //         style={[styles.image, { backgroundColor: Color.SURFACE_SECONDARY }]}
    //       />
    //     )}
    //     <View style={styles.productInfo}>
    //       <StandardText>{product.name}</StandardText>
    //       <CaptionText>{formatPrice(product.price)}</CaptionText>
    //       <CaptionText>{orderStatus}</CaptionText>
    //     </View>
    //     {showCheckbox && (
    //       <PressableOpacity onPress={onPress}>
    //         <Checkbox value={isChecked} style={{ pointerEvents: 'none' }} />
    //       </PressableOpacity>
    //     )}
    //   </View>
    // </View>
    <View style={[passedStyles, styles.container]}>
      <View style={styles.infoContainer}>
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
          <HeaderText>{product.name}</HeaderText>
          <BoldCaptionText style={{ marginTop: Spacing.SPACING_1 }}>
            {formatPrice(product.price)}
          </BoldCaptionText>
          <CaptionText style={{ marginTop: Spacing.SPACING_1 }}>
            {product.category}
          </CaptionText>
          <CaptionText style={{ marginTop: Spacing.SPACING_1 }}>
            {product.condition}
          </CaptionText>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.amountContainer}>
          <Ionicons
            name="trash-outline"
            size={20}
            color={Color.PRIMARY_DEFAULT}
          />
          <BoldStandardText style={{ marginHorizontal: Spacing.SPACING_3 }}>
            1
          </BoldStandardText>
          <Ionicons
            name="add-outline"
            size={20}
            color={Color.PRIMARY_DEFAULT}
          />
        </View>
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
    overflow: 'hidden',
  },
  productInfo: {
    flex: 1,
    marginLeft: Spacing.SPACING_3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: Radius.LG,
    flex: 0,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
  },
  rightContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountContainer: {
    backgroundColor: Color.WHITE,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.SPACING_2,
  },
});
