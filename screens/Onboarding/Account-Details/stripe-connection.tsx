import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import HeadingText from '@/components/Texts/HeadingText';
import Spacing from '@/constants/Spacing';
import BodyText from '@/components/Texts/BodyText';
import { PlazaLogo, StripeColorLogo } from '@/components/Icons';
import { Ionicons } from '@expo/vector-icons';
import Color from '@/constants/Color';
import { accountDetailStyles } from './styles';
import { useLocalSearchParams } from 'expo-router';

interface StripeConnectionProps {
  onChangeStripeAccountId: (value: string) => void;
}

const StripeConnection: FC<StripeConnectionProps> = ({
  onChangeStripeAccountId,
}) => {
  // stripe connection, should call onChangeStripeAccountId

  return (
    <View style={accountDetailStyles.slide}>
      <View>
        <HeadingText variant="h3-bold">Set up payments with Stripe</HeadingText>
        <BodyText variant="md" style={{ marginTop: Spacing.SPACING_2 }}>
          To accept payments, we need you to create an account for Stripe.
        </BodyText>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.decoContainer}>
          <StripeColorLogo width={150} />
          <Ionicons name="close-outline" size={40} />
          <PlazaLogo
            color={Color.PRIMARY_DEFAULT}
            style={{ marginLeft: Spacing.SPACING_3 }}
          />
        </View>
      </View>
    </View>
  );
};

export default StripeConnection;

const styles = StyleSheet.create({
  decoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
