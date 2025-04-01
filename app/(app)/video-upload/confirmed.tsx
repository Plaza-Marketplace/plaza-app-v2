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

const Confirmed = () => {
  const execute = () => {
    router.navigate('/(app)/(tabs)/(upload)/landing-page');
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <HeaderText style={styles.text}>
          Your video has been uploaded!
        </HeaderText>
      </View>

      <View style={[styles.checkContainer, { marginTop: Spacing.SPACING_4 }]}>
        <Check width={75} height={75} color={Color.WHITE} />
      </View>

      <PlazaButton
        title="Continue"
        onPress={execute}
        style={{ marginTop: Spacing.SPACING_4, padding: Spacing.SPACING_3 }}
      />
    </View>
  );
};

export default Confirmed;

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
