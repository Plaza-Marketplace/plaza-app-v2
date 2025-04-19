import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking, StyleSheet } from 'react-native';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import BoldSubheaderText from '@/components/Texts/BoldSubheaderText';
import PlazaDescriptionButton from '@/components/Buttons/PlazaDescriptionButton';
import { router } from 'expo-router';
import { Basket, Camera, ShopifyLogo, StripeLogo } from '@/components/Icons';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import Loading from '@/components/Loading';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import BodyText from '@/components/Texts/BodyText';
import { createAccountLink, createStripeAccount } from '@/services/stripe';
import { useUpdateUser } from '@/hooks/queries/useUser';

const LandingPage = () => {
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { mutate: updateUser } = useUpdateUser();

  if (!user) {
    return <Loading />;
  }

  const handleCreateAccount = async () => {
    try {
      const { account } = await createStripeAccount(user.id, user.email);
      console.log('Stripe account created successfully:', account);
      updateUser({
        id: user.id,
        stripeAccountId: account,
      });
      const accountLink = await createAccountLink(
        account,
        'https://www.plaza-app.com/stripe/creation-success',
        'https://www.plaza-app.com/stripe/creation-failure'
      );
      Linking.openURL(accountLink.url);
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BoldSubheaderText>Create</BoldSubheaderText>

      <PlazaDescriptionButton
        style={styles.button} // Add margin to separate from the header
        title="List a Product"
        description="Upload an item you want to sell on your profile"
        leftIcon={<Basket color={Color.PRIMARY_DEFAULT} />} // Replace with your icon component
        onPress={() => {
          router.push('/list-item/create-listing');
        }}
      />

      <PlazaDescriptionButton
        style={styles.button}
        title="Upload a Video"
        description="Upload a video that showcases the products from your storefront"
        leftIcon={<Camera color={Color.PRIMARY_DEFAULT} />} // Replace with your icon component
        onPress={() => {
          router.push('/video-upload/landing-page');
        }}
      />

      <PlazaDescriptionButton
        style={styles.button}
        title="Shopify Transfer"
        description="Transfer your already listed items from Shopify to Plaza!"
        leftIcon={<ShopifyLogo width={32} height={32} />} // Replace with your icon component
        onPress={() => {
          router.push('/shopify-migration/landing-page');
        }}
      />

      {!user.stripeAccountId && (
        <PressableOpacity
          style={styles.stripeButton}
          onPress={handleCreateAccount}
        >
          <StripeLogo />
          <BodyText
            variant="md"
            color={Color.WHITE}
            style={{ marginLeft: Spacing.SPACING_2 }}
          >
            Create a Stripe Account
          </BodyText>
        </PressableOpacity>
      )}
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: Spacing.SPACING_3,
    paddingVertical: Spacing.SPACING_3,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
  button: {
    marginTop: Spacing.SPACING_3,
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
