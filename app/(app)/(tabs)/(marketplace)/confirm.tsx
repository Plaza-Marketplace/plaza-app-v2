import PlazaButton from '@/components/Buttons/PlazaButton';
import FocusHeader from '@/components/FocusHeader';
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
  const { mutate: createOrderHistoryItems } = useCreateOrderHistoryItems(
    selectedCartItems.map((cartItem) => cartItem.product.id),
    user?.id
  );

  const handleSubmit = () => {
    // router.push('/purchase');
    createOrderHistoryItems();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FocusHeader name="Shopping Cart" />
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
    </SafeAreaView>
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
