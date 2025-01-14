import PlazaButton from '@/components/Buttons/PlazaButton';
import ShoppingCartProductCard from '@/components/Product/ProductCards/ShoppingCartProductCard';
import Spacing from '@/constants/Spacing';
import { useAuth } from '@/contexts/AuthContext';
import useGetCartItemsByUserId from '@/hooks/queries/useGetCartItemsByUserId';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const CartScreen = () => {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { data: cartItems } = useGetCartItemsByUserId(user?.id);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {cartItems?.map((cartItem) => (
          <ShoppingCartProductCard
            key={cartItem.id}
            product={cartItem.product}
            isChecked={selectedItems.includes(cartItem)}
            showCheckbox
          />
        ))}
      </View>
      <PlazaButton title="Checkout" onPress={() => router.push('/confirm')} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.SPACING_3,
  },
  content: {
    flex: 1,
    gap: Spacing.SPACING_3,
  },
});
