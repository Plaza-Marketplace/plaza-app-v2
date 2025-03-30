import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet, View } from 'react-native';
import ProductSelectedShowcase from '@/components/PostCards/ProductCards/ProductSelectedShowcase';
import AddContentCard from '@/components/AddContentCard';
import Color from '@/constants/Color';
import VideoPreview from '@/components/VideoPreview';
import { ProductDetails } from '@/models/communityPost';
import Spacing from '@/constants/Spacing';
import BoldSubheaderText from '@/components/Texts/BoldSubheaderText';
import PlazaDescriptionButton from '@/components/Buttons/PlazaDescriptionButton';
import { Redirect, router } from 'expo-router';
import { Basket, Camera, ShopifyLogo } from '@/components/Icons';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import Loading from '@/components/Loading';

const LandingPage = () => {
  const test: ProductDetails = {
    id: 1,
    name: 'Product',
    imageUrls: ['test'],
    price: 1,
    seller: {
      id: 1,
      username: 'Joe',
    },
  };

  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);

  if (!user) {
    return <Loading />;
  }

  console.log(user);

  if (!user.stripeAccountId) {
    return <Redirect href={'/seller-onboarding'} />;
  }

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
});
