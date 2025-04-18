import PlazaButton from '@/components/Buttons/PlazaButton';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import RadioButtonGroup from '@/components/Buttons/RadioButtonGroup';
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
import {
  useCreateAddress,
  useDeleteAddress,
  useGetAddresses,
} from '@/hooks/queries/useAddress';
import useCreateOrderHistoryItems from '@/hooks/queries/useCreateOrderHistoryItems';
import useGetCartItemsByUserId from '@/hooks/queries/useGetCartItemsByUserId';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { createPayment } from '@/services/stripe';
import { formatPrice } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import {
  AddressSheet,
  AddressSheetError,
  useStripe,
} from '@stripe/stripe-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import { FormType } from '../models';

const ConfirmCartScreen = () => {
  const [currForm, setCurrForm] = useState(FormType.SHIPPING);
  const [addressSheetVisible, setAddressSheetVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { data: userAddresses } = useGetAddresses(user?.id);
  const { data: cartItems } = useGetCartItemsByUserId(user?.id);
  const { mutate: createAddress } = useCreateAddress(user?.id);
  const { mutate: deleteAddress } = useDeleteAddress(user?.id);
  const { mutate: createOrderHistoryItems } = useCreateOrderHistoryItems(
    user
      ? cartItems.map((cartItem) => ({
          userId: user.id,
          sellerId: cartItem.product.sellerId,
          finalPrice: cartItem.product.price,
          productId: cartItem.product.id,
          shippingAddress: selectedAddress?.id || -1,
          quantity: cartItem.quantity,
        }))
      : []
  );

  const subtotalPrice =
    cartItems?.reduce(
      (acc, curr) => acc + curr.product.price * curr.quantity,
      0
    ) || 0;

  const shippingPrice =
    cartItems?.reduce(
      (acc, curr) => acc + curr.product.shippingPrice * curr.quantity,
      0
    ) || 0;

  const totalCount =
    cartItems?.reduce((acc, curr) => acc + curr.quantity, 0) || 0;

  const stripeProcessingPrice = (subtotalPrice + shippingPrice) * 0.029 + 0.3;

  const stripe = useStripe();

  const bottomButtonPress = async () => {
    if (currForm === FormType.PAYMENT) {
      if (!stripe) {
        Alert.alert('Stripe is not initialized');
        return;
      }
      if (!selectedAddress) {
        Alert.alert('Please select a shipping address');
        return;
      }
      const paymentGroup = uuidv4();
      const { paymentIntent, ephemeralKey, customer } = await createPayment(
        paymentGroup
      );

      await stripe.initPaymentSheet({
        merchantDisplayName: 'Plaza',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
      });
      const { error } = await stripe.presentPaymentSheet();
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        createOrderHistoryItems();
        router.push('/confirm');
      }
    } else {
      setCurrForm(FormType.PAYMENT);
    }
  };

  if (!cartItems || !userAddresses || !user) return <Loading />;

  return (
    <View style={styles.container}>
      <PlazaHeader name="Purchase" />

      <View style={styles.formChoices}>
        <PressableOpacity
          onPress={() => setCurrForm(FormType.SHIPPING)}
          style={
            currForm === FormType.SHIPPING ? styles.active : styles.inactive
          }
        >
          {currForm === FormType.SHIPPING ? (
            <BoldSubheaderText style={styles.activeText}>
              Shipping
            </BoldSubheaderText>
          ) : (
            <SubheaderText style={styles.inactiveText}>Shipping</SubheaderText>
          )}
        </PressableOpacity>

        <PressableOpacity
          onPress={() => setCurrForm(FormType.PAYMENT)}
          style={
            currForm === FormType.PAYMENT ? styles.active : styles.inactive
          }
        >
          {currForm === FormType.PAYMENT ? (
            <BoldSubheaderText style={styles.activeText}>
              Payment
            </BoldSubheaderText>
          ) : (
            <SubheaderText style={styles.inactiveText}>Payment</SubheaderText>
          )}
        </PressableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.currCartItems}>
          {cartItems.map((cartItem) => (
            <ShoppingCartProductCard
              key={cartItem.id}
              product={cartItem.product}
              amount={cartItem.quantity}
              interactable={false}
            />
          ))}
        </View>

        {currForm === FormType.PAYMENT && (
          <View style={styles.priceContainer}>
            <HeaderText>Total Items: {totalCount}</HeaderText>
            <View style={styles.textRow}>
              <BoldStandardText style={styles.text}>Subtotal:</BoldStandardText>
              <StandardText style={styles.text}>
                {formatPrice(subtotalPrice)}
              </StandardText>
            </View>

            <View style={styles.textRow}>
              <BoldStandardText style={styles.text}>
                Delivery Fee:
              </BoldStandardText>
              <StandardText style={styles.text}>
                {formatPrice(shippingPrice)}
              </StandardText>
            </View>

            <View style={styles.textRow}>
              <BoldStandardText style={styles.text}>
                Processing Fee:
              </BoldStandardText>
              <StandardText style={styles.text}>
                {formatPrice(stripeProcessingPrice)}
              </StandardText>
            </View>

            <View style={styles.textRow}>
              <HeaderText>Total:</HeaderText>

              <HeaderText>
                {formatPrice(
                  subtotalPrice + shippingPrice + stripeProcessingPrice
                )}
              </HeaderText>
            </View>
          </View>
        )}

        {currForm === FormType.SHIPPING && (
          <>
            <HeaderText style={styles.headerText}>Delivery Address</HeaderText>
            <RadioButtonGroup
              items={userAddresses}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(item) => (
                <View style={styles.radioElementStyle}>
                  <View style={styles.radioTextContainer}>
                    <BoldStandardText>{item.addressedTo}</BoldStandardText>
                    <StandardText style={{ marginTop: Spacing.SPACING_1 }}>
                      {item.addressLine1}
                    </StandardText>
                    {item.addressLine2 && (
                      <StandardText>{item.addressLine2}</StandardText>
                    )}
                    <StandardText>
                      {item.country}, {item.city}, {item.state}
                    </StandardText>
                    <StandardText>{item.zipCode}</StandardText>
                  </View>
                  <PressableOpacity
                    onPress={() => {
                      // Handle address selection
                      deleteAddress(item.id);
                    }}
                  >
                    <Ionicons name="trash-outline" size={24} color="black" />
                  </PressableOpacity>
                </View>
              )}
              onSelect={(selectedItem) => {
                // Handle address selection
                setSelectedAddress(selectedItem);
              }}
            />
            <PlazaButton
              title="Add Shipping Address"
              onPress={() => setAddressSheetVisible(true)}
              style={{ marginBottom: Spacing.SPACING_5 }}
            />
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <PlazaButton
          style={{ paddingVertical: Spacing.SPACING_3 }}
          title={currForm === FormType.PAYMENT ? 'Confirm Payment' : 'Continue'}
          onPress={bottomButtonPress}
        />
      </View>

      <AddressSheet
        appearance={{
          colors: {},
        }}
        defaultValues={{
          phone: '111-222-3333',
          address: {
            country: 'United States',
            city: 'San Francisco',
          },
        }}
        allowedCountries={['US', 'CA', 'GB']}
        primaryButtonTitle={'Use this address'}
        sheetTitle={'Shipping Address'}
        visible={addressSheetVisible}
        onSubmit={async (addressDetails) => {
          // Make sure to set `visible` back to false to dismiss the address element.
          setAddressSheetVisible(false);

          // Handle result and update your UI
          createAddress({
            addressedTo: addressDetails.name,
            addressLine1: addressDetails.address.line1 || '',
            addressLine2: addressDetails.address.line2 || '',
            city: addressDetails.address.city || '',
            state: addressDetails.address.state || '',
            zipCode: addressDetails.address.postalCode || '',
            country: addressDetails.address.country || '',
            createdId: user.id,
          });
        }}
        onError={(error) => {
          if (error.code === AddressSheetError.Failed) {
            Alert.alert('There was an error.', 'Check the logs for details.');
            console.error(error?.localizedMessage);
          }
          // Make sure to set `visible` back to false to dismiss the address element.
          setAddressSheetVisible(false);
        }}
      />
    </View>
  );
};

export default ConfirmCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.SPACING_3,
  },
  currCartItems: {
    gap: Spacing.SPACING_3,
  },
  footer: {
    padding: Spacing.SPACING_3,
    borderTopWidth: 1,
    borderTopColor: Color.BORDER_SECONDARY,
  },
  formChoices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.SPACING_3,
    paddingVertical: Spacing.SPACING_2,
  },
  active: {
    paddingBottom: Spacing.SPACING_2,
    borderBottomWidth: 2,
    borderBottomColor: Color.PRIMARY_DEFAULT,
  },
  activeText: {
    fontWeight: 'bold',
    color: Color.PRIMARY_DEFAULT,
  },
  inactive: {
    paddingBottom: Spacing.SPACING_1,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  inactiveText: {
    fontWeight: 'normal',
    color: Color.NEUTRALS_DEFAULT,
  },
  headerText: {
    marginVertical: Spacing.SPACING_3,
  },
  radioElementStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioTextContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  radioText: {
    color: Color.NEUTRALS_DEFAULT,
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
  priceContainer: {
    marginTop: Spacing.SPACING_3,
  },
});
