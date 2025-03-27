import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import HeaderText from '@/components/Texts/HeaderText';
import { Check } from '@/components/Icons';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { useRemoveCartItem } from '@/hooks/routes/cart';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import useGetCartItemsByUserId from '@/hooks/queries/useGetCartItemsByUserId';
import Loading from '@/components/Loading';
import ProductIcon from '@/components/Product/ProductIcon';
import { router } from 'expo-router';
import PlazaButton from '@/components/Buttons/PlazaButton';
import StandardText from '@/components/Texts/StandardText';

const Confirm = () => {
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  if (!user) return <Loading />;
  const { data: cartItems } = useGetCartItemsByUserId(user?.id);
  const { mutate: removeCartItem } = useRemoveCartItem(user.id);

  // TODO: Wait 10 seconds, and then automatically remove the cart items from the database
  // also automatically navigate back to the cart screen

  const execute = () => {
    cartItems?.forEach((cartItem) => {
      removeCartItem(cartItem.id);
    });
    router.navigate('/(app)/(tabs)/(marketplace)/(top-tabs)/feed');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      execute();
    }, 5000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <HeaderText style={styles.text}>
          Your Purchase Has Been Confirmed!
        </HeaderText>
      </View>

      <View style={[styles.checkContainer, { marginTop: Spacing.SPACING_4 }]}>
        <Check width={75} height={75} color={Color.WHITE} />
      </View>

      <View style={[styles.productContainer, { marginTop: Spacing.SPACING_4 }]}>
        {cartItems?.map((cartItem) => (
          <ProductIcon
            imageUrl={cartItem.product.imageUrls[0]}
            size={125}
            key={cartItem.id}
          />
        ))}
      </View>

      <PlazaButton
        title="Continue Shopping"
        onPress={execute}
        style={{ marginTop: Spacing.SPACING_4, padding: Spacing.SPACING_3 }}
      />

      <StandardText style={{ marginTop: Spacing.SPACING_2 }}>
        You will be redirected to the feed in 5 seconds.
      </StandardText>
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textContainer: {
    width: '50%',
  },
  text: {
    textAlign: 'center',
  },
  checkContainer: {
    padding: 10,
    backgroundColor: Color.SUCCESS_DEFAULT,
    borderRadius: 9999,
  },
  productContainer: {
    flexDirection: 'row',
    columnGap: Spacing.SPACING_3,
  },
});
