import PlazaButton from '@/components/Buttons/PlazaButton';
import FocusHeader from '@/components/FocusHeader';
import ShoppingCartProductCard from '@/components/Product/ProductCards/ShoppingCartProductCard';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConfirmScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FocusHeader name="Shopping Cart" />
      <View style={styles.content}>
        <ShoppingCartProductCard showCheckbox={false} />
        <ShoppingCartProductCard showCheckbox={false} />
      </View>
      <PlazaButton
        title="Confirm Items"
        onPress={() => router.push('/purchase')}
      />
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
