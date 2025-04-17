import PlazaButton from '@/components/Buttons/PlazaButton';
import Loading from '@/components/Loading';
import PlazaHeader from '@/components/PlazaHeader';
import ShoppingCartProductCard from '@/components/Product/ProductCards/ShoppingCartProductCard';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import BoldSubheaderText from '@/components/Texts/BoldSubheaderText';
import HeaderText from '@/components/Texts/HeaderText';
import StandardText from '@/components/Texts/StandardText';
import SubheaderText from '@/components/Texts/SubheaderText';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { useAuth } from '@/contexts/AuthContext';
import { useSelectedCartItems } from '@/contexts/CartSelectedProductsContext';
import useGetCartItemsByUserId from '@/hooks/queries/useGetCartItemsByUserId';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import {
  useAddQuantity,
  useRemoveCartItem,
  useRemoveQuantity,
} from '@/hooks/routes/cart';
import { formatPrice } from '@/utils/currency';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

const CartScreen = () => {
  const snapPoints = useMemo(() => ['20%', '40%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const animatedPosition = useSharedValue(0);
  const [height, setHeight] = useState(0);
  const opacity = useSharedValue(0);

  useDerivedValue(() => {
    if (height == 0) return;
    const currentPercentage = 1 - animatedPosition.value / height;
    opacity.value = Math.max((currentPercentage - 0.2) / 0.2, 0);
  }, [animatedPosition, height]);

  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { data: cartItems } = useGetCartItemsByUserId(user?.id);

  const { mutate: incrementCartItem } = useAddQuantity(user.id);
  const { mutate: decrementCartItem } = useRemoveQuantity(user.id);
  const { mutate: removeCartItem } = useRemoveCartItem(user.id);

  if (!user) return <Loading />;

  const subtotal =
    cartItems?.reduce(
      (acc, curr) => acc + curr.product.price * curr.quantity,
      0
    ) || 0;

  const handleAddPress = (cartItem: CartItem) => {
    // Logic to add item to cart
    incrementCartItem(cartItem.id);
  };

  const handleRemovePress = (cartItem: CartItem) => {
    // Logic to remove item from cart
    if (cartItem.quantity > 1) {
      decrementCartItem(cartItem.id);
    } else {
      // handle removing the item from the cart
      removeCartItem(cartItem.id);
    }
  };

  const handleSubmit = () => {
    router.push('/checkout');
  };

  return (
    <View
      style={[styles.container]}
      onLayout={({ nativeEvent }) => {
        const { height } = nativeEvent.layout;
        setHeight(height);
      }}
    >
      <PlazaHeader name="Your Cart Things" />
      <FlatList
        style={styles.content}
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: cartItem }) => (
          <ShoppingCartProductCard
            key={cartItem.id}
            product={cartItem.product}
            amount={cartItem.quantity}
            onAddPress={() => handleAddPress(cartItem)}
            onRemovePress={() => handleRemovePress(cartItem)}
            styles={{ marginBottom: Spacing.SPACING_3 }}
          />
        )}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        animatedPosition={animatedPosition}
        enableDynamicSizing={false}
        backgroundStyle={styles.bottomSheetStyle}
        footerComponent={(props) => (
          <BottomSheetFooter style={styles.footerContainer} {...props}>
            <View style={styles.priceContainer}>
              <BoldSubheaderText>Total:</BoldSubheaderText>
              <SubheaderText>{formatPrice(subtotal)}</SubheaderText>
            </View>
            <PlazaButton
              style={{
                paddingVertical: Spacing.SPACING_3,
                marginTop: Spacing.SPACING_1,
              }}
              title="Checkout"
              onPress={handleSubmit}
            />
          </BottomSheetFooter>
        )}
      >
        <BottomSheetView style={styles.modalView}>
          <HeaderText>
            Total Items:{' '}
            {cartItems?.reduce((acc, curr) => acc + curr.quantity, 0) || 0}
          </HeaderText>

          <Animated.View style={{ opacity: opacity }}>
            <View style={styles.textRow}>
              <BoldStandardText style={styles.text}>Subtotal:</BoldStandardText>
              <StandardText style={styles.text}>
                {formatPrice(subtotal)}
              </StandardText>
            </View>

            <View style={styles.textRow}>
              <BoldStandardText style={styles.text}>Taxes:</BoldStandardText>
              <StandardText style={styles.text}>lol</StandardText>
            </View>

            <View style={styles.textRow}>
              <BoldStandardText style={styles.text}>
                Delivery Fee:
              </BoldStandardText>
              <StandardText style={styles.text}>FREE</StandardText>
            </View>
          </Animated.View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
  bottomSheetStyle: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // X and Y offset
    shadowOpacity: 0.25, // Transparency of the shadow
    shadowRadius: 4, // Blur effect
    elevation: 5, // Required for Android shadow
  },
  content: {
    flex: 1,
    gap: Spacing.SPACING_3,
    backgroundColor: Color.SURFACE_PRIMARY,
    paddingHorizontal: Spacing.SPACING_3,
    marginTop: Spacing.SPACING_3,
  },
  modalView: {
    flex: 1,
    paddingHorizontal: Spacing.SPACING_3,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.SPACING_2,
  },
  footerContainer: {
    paddingHorizontal: Spacing.SPACING_3,
    paddingBottom: Spacing.SPACING_3,
    backgroundColor: Color.WHITE,
  },
  textRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.SPACING_3,
  },
  text: {
    color: Color.NEUTRALS_DEFAULT,
  },
});
