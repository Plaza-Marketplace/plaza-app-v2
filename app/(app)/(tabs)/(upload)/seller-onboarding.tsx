import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/Buttons/BackButton';
import Spacing from '@/constants/Spacing';
import HeaderText from '@/components/Texts/HeaderText';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';
import PlazaButton from '@/components/Buttons/PlazaButton';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Color from '@/constants/Color';
import { PlazaLogo, StripeColorLogo, StripeLogo } from '@/components/Icons';
import { Ionicons } from '@expo/vector-icons';

const SellerOnboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <HeadingText variant="h3-bold">
          Wanna start selling on plaza?
        </HeadingText>
        <BodyText variant="md" style={{ marginTop: Spacing.SPACING_2 }}>
          Simply create an account with Stripe to start receiving payments!
        </BodyText>
      </View>

      <View style={styles.decoContainer}>
        <StripeColorLogo width={150} />
        <Ionicons name="close-outline" size={40} />
        <PlazaLogo
          color={Color.PRIMARY_DEFAULT}
          style={{ marginLeft: Spacing.SPACING_3 }}
        />
      </View>

      <View style={styles.buttonSectionContainer}>
        <PressableOpacity
          style={styles.stripeButton}
          onPress={() => alert('Stripe button pressed!')}
        >
          <StripeLogo />
          <BodyText
            variant="md"
            color={Color.WHITE}
            style={{ marginLeft: Spacing.SPACING_2 }}
          >
            Create an Account
          </BodyText>
        </PressableOpacity>

        <BodyText
          variant="sm"
          style={{
            marginTop: Spacing.SPACING_2,
          }}
        >
          Already have a Stripe Account? Log in
        </BodyText>
      </View>
    </SafeAreaView>
  );
};

export default SellerOnboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.SPACING_4,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  decoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSectionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  stripeButton: {
    backgroundColor: Color.STRIPE_DEFAULT, // Stripe's brand color
    paddingVertical: Spacing.SPACING_2,
    paddingHorizontal: Spacing.SPACING_4,
    borderRadius: 8,
    marginTop: Spacing.SPACING_3,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
