import PlazaButton from '@/components/Buttons/PlazaButton';
import ShoppingCartProductCard from '@/components/Product/ProductCards/ShoppingCartProductCard';
import BoldCaptionText from '@/components/Texts/BoldCaptionText';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import BoldSubheaderText from '@/components/Texts/BoldSubheaderText';
import CaptionText from '@/components/Texts/CaptionText';
import HeaderText from '@/components/Texts/HeaderText';
import StandardText from '@/components/Texts/StandardText';
import SubheaderText from '@/components/Texts/SubheaderText';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { useAuth } from '@/contexts/AuthContext';
import { useSelectedCartItems } from '@/contexts/CartSelectedProductsContext';
import useGetCartItemsByUserId from '@/hooks/queries/useGetCartItemsByUserId';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CartScreen = () => {
  const { selectedCartItems, setSelectedCartItems } = useSelectedCartItems();
  const inset = useSafeAreaInsets();
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

  const handleSelectItem = (cartItem: CartItem) => {
    if (selectedCartItems.includes(cartItem)) {
      setSelectedCartItems(
        selectedCartItems.filter((item) => item !== cartItem)
      );
    } else {
      setSelectedCartItems([...selectedCartItems, cartItem]);
    }
  };

  const handleSubmit = () => {
    router.push('/confirm');
  };

  return (
    <View
      style={[styles.container, { marginTop: inset.top }]}
      onLayout={({ nativeEvent }) => {
        const { x, y, width, height } = nativeEvent.layout;
        setHeight(height);
      }}
    >
      <ScrollView style={styles.content}>
        {cartItems?.map((cartItem) => (
          <ShoppingCartProductCard
            key={cartItem.id}
            product={cartItem.product}
            onPress={() => handleSelectItem(cartItem)}
            isChecked={selectedCartItems.includes(cartItem)}
            showCheckbox
            styles={{ marginBottom: Spacing.SPACING_3 }}
          />
        ))}
      </ScrollView>

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
              <SubheaderText>$10.61</SubheaderText>
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
          <HeaderText>Total Items: 1</HeaderText>

          <Animated.View style={{ opacity: opacity }}>
            <View style={styles.textRow}>
              <BoldStandardText style={styles.text}>Subtotal:</BoldStandardText>
              <StandardText style={styles.text}>$3.33</StandardText>
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
    paddingTop: 60,
    flex: 1,
    padding: Spacing.SPACING_3,
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
