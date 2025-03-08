import PlazaButton from '@/components/Buttons/PlazaButton';
import PlazaHeader from '@/components/PlazaHeader';
import ShoppingCartProductCard from '@/components/Product/ProductCards/ShoppingCartProductCard';
import Spacing from '@/constants/Spacing';
import { useAuth } from '@/contexts/AuthContext';
import { useSelectedCartItems } from '@/contexts/CartSelectedProductsContext';
import useCreateOrderHistoryItems from '@/hooks/queries/useCreateOrderHistoryItems';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

const ConfirmScreen = () => {
  const { selectedCartItems } = useSelectedCartItems();
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { mutate: createOrderHistoryItems } = useCreateOrderHistoryItems(
    selectedCartItems.map((cartItem) => cartItem.product.id),
    user?.id
  );

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(``, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      createOrderHistoryItems();
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  // const handleSubmit = () => {
  //   // router.push('/purchase');
  // };

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
      <PlazaButton title="Confirm Items" onPress={openPaymentSheet} />
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
