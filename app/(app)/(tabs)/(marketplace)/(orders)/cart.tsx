import PlazaButton from '@/components/Buttons/PlazaButton';
import productCardStyles from '@/components/PostCards/ProductCards/styles';
import ShoppingCartProductCard from '@/components/Product/ProductCards/ShoppingCartProductCard';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { useAuth } from '@/contexts/AuthContext';
import { useSelectedCartItems } from '@/contexts/CartSelectedProductsContext';
import useGetCartItemsByUserId from '@/hooks/queries/useGetCartItemsByUserId';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CartScreen = () => {
  const { selectedCartItems, setSelectedCartItems } = useSelectedCartItems();

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
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {cartItems?.map((cartItem) => (
          <ShoppingCartProductCard
            key={cartItem.id}
            product={cartItem.product}
            onPress={() => handleSelectItem(cartItem)}
            isChecked={selectedCartItems.includes(cartItem)}
            showCheckbox
          />
        ))}
      </ScrollView>
      <PlazaButton title="Checkout" onPress={handleSubmit} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.SPACING_3,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
  content: {
    flex: 1,
    gap: Spacing.SPACING_3,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
});
