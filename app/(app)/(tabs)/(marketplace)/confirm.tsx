import PlazaButton from '@/components/Buttons/PlazaButton';
import Loading from '@/components/Loading';
import PlazaHeader from '@/components/PlazaHeader';
import ShoppingCartProductCard from '@/components/Product/ProductCards/ShoppingCartProductCard';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { useAuth } from '@/contexts/AuthContext';
import { useSelectedCartItems } from '@/contexts/CartSelectedProductsContext';
import useCreateOrderHistoryItems from '@/hooks/queries/useCreateOrderHistoryItems';
import useGetCartItemsByUserId from '@/hooks/queries/useGetCartItemsByUserId';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { createPaymentIntent } from '@/services/stripe';
import { useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

const ConfirmScreen = () => {
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const shippingAddress = 'lol';
  const { data: cartItems } = useGetCartItemsByUserId(user?.id);
  if (!cartItems) return <Loading />;
  const { mutate: createOrderHistoryItems } = useCreateOrderHistoryItems(
    user
      ? cartItems.map((cartItem) => ({
          userId: user.id,
          sellerId: cartItem.product.sellerId,
          finalPrice: cartItem.product.price,
          productId: cartItem.product.id,
          shippingAddress: shippingAddress,
          quantity: cartItem.quantity,
        }))
      : []
  );

  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  // const [loading, setLoading] = useState(false);

  // const fetchPaymentSheetParams = async () => {
  //   const { paymentIntent, ephemeralKey, customer } = await createPaymentIntent(
  //     'cus_RwCJBAhK0TDjUd',
  //     'acct_1R2JvMPDBPbyu0XD',
  //     1000,
  //     'usd'
  //   );

  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   };
  // };

  // const initializePaymentSheet = async () => {
  //   const { paymentIntent, ephemeralKey, customer } =
  //     await fetchPaymentSheetParams();

  //   const { error } = await initPaymentSheet({
  //     merchantDisplayName: 'Example, Inc.',
  //     customerId: customer,
  //     customerEphemeralKeySecret: ephemeralKey,
  //     paymentIntentClientSecret: paymentIntent,
  //     // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
  //     //methods that complete payment after a delay, like SEPA Debit and Sofort.
  //     allowsDelayedPaymentMethods: true,
  //     defaultBillingDetails: {
  //       name: 'Jane Doe',
  //     },
  //   });
  //   if (!error) {
  //     setLoading(true);
  //   }
  // };

  // const openPaymentSheet = async () => {
  //   const { error } = await presentPaymentSheet();

  //   if (error) {
  //     Alert.alert(`Error code: ${error.code}`, error.message);
  //   } else {
  //     Alert.alert('Success', 'Your order is confirmed!');
  //     createOrderHistoryItems();
  //   }
  // };

  // useEffect(() => {
  //   initializePaymentSheet();
  // }, []);

  return (
    <View style={styles.container}>
      <PlazaHeader name="Purchase" />
      <View style={styles.content}>
        {cartItems.map((cartItem) => (
          <ShoppingCartProductCard
            key={cartItem.id}
            product={cartItem.product}
            amount={cartItem.quantity}
            interactable={false}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <PlazaButton
          style={{ paddingVertical: Spacing.SPACING_3 }}
          title="Confirm Items"
          onPress={() => {}}
        />
      </View>
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
  footer: {
    padding: Spacing.SPACING_3,
    borderTopWidth: 1,
    borderTopColor: Color.BORDER_SECONDARY,
  },
});
