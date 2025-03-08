import PlazaButton from '@/components/Buttons/PlazaButton';
import PlazaHeader from '@/components/PlazaHeader';
import ShoppingCartProductCard from '@/components/Product/ProductCards/ShoppingCartProductCard';
import Spacing from '@/constants/Spacing';
import { useAuth } from '@/contexts/AuthContext';
import { useSelectedCartItems } from '@/contexts/CartSelectedProductsContext';
import useCreateOrderHistoryItems from '@/hooks/queries/useCreateOrderHistoryItems';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConfirmScreen = () => {
  const { selectedCartItems } = useSelectedCartItems();
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const shippingAddress = 'lol';
  const { mutate: createOrderHistoryItems } = useCreateOrderHistoryItems(
    user
      ? selectedCartItems.map((cartItem) => ({
          userId: user.id,
          sellerId: cartItem.product.sellerId,
          finalPrice: cartItem.product.price,
          productId: cartItem.product.id,
          shippingAddress: shippingAddress,
        }))
      : []
  );

  const handleSubmit = () => {
    // router.push('/purchase');
    createOrderHistoryItems();
  };

  return (
    <View style={styles.container}>
      <PlazaHeader name="Shopping Cart" />
      <View style={styles.content}>
        {selectedCartItems.map((cartItem) => (
          <ShoppingCartProductCard
            key={cartItem.id}
            product={cartItem.product}
            showCheckbox={false}
          />
        ))}
      </View>
      <PlazaButton title="Confirm Items" onPress={handleSubmit} />
    </View>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: Spacing.SPACING_3,
    padding: Spacing.SPACING_3,
  },
});
