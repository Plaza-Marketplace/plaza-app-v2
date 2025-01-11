import PlazaButton from '@/components/Buttons/PlazaButton';
import ShoppingCartProductCard from '@/components/Product/ProductCards/ShoppingCartProductCard';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ShoppingCartProductCard isChecked showCheckbox />
        <ShoppingCartProductCard isChecked showCheckbox />
        <ShoppingCartProductCard isChecked={false} showCheckbox />
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
