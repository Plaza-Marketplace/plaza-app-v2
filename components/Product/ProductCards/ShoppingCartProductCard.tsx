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
import PressableOpacity from '@/components/Buttons/PressableOpacity';

interface ShoppingCartProductCardProps {
  product: Product;
  interactable?: boolean;
  amount: number | null;
  onAddPress?: () => void;
  onRemovePress?: () => void;
  styles?: ViewStyle;
}

const ShoppingCartProductCard: FC<ShoppingCartProductCardProps> = ({
  product,
  interactable = true,
  amount,
  onAddPress,
  onRemovePress,
  styles: passedStyles,
}) => {
  return (
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

      {interactable && (
        <View style={[styles.rightContainer, styles.shadow]}>
          <View style={styles.amountContainer}>
            <PressableOpacity onPress={onRemovePress}>
              <Ionicons
                name="trash-outline"
                size={20}
                color={Color.PRIMARY_DEFAULT}
              />
            </PressableOpacity>
            <BoldStandardText style={{ marginHorizontal: Spacing.SPACING_3 }}>
              {amount}
            </BoldStandardText>
            <PressableOpacity onPress={onAddPress}>
              <Ionicons
                name="add-outline"
                size={20}
                color={Color.PRIMARY_DEFAULT}
              />
            </PressableOpacity>
          </View>
        </View>
      )}

      {!interactable && (
        <View style={[styles.rightContainer, styles.shadow]}>
          <View style={styles.amountDisplay}>
            <BoldStandardText>{amount}</BoldStandardText>
          </View>
        </View>
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
  amountDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    width: 30,
    height: 30,
    backgroundColor: Color.WHITE,
  },
  shadow: {
    shadowColor: Color.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});
