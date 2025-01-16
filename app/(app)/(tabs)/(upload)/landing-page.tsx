import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet, View } from 'react-native';
import ProductSelectedShowcase from '@/components/PostCards/ProductCards/ProductSelectedShowcase';
import AddContentCard from '@/components/AddContentCard';
import Color from '@/constants/Color';
import VideoPreview from '@/components/VideoPreview';
import { ProductDetails } from '@/models/communityPost';

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

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        loop={false}
        width={Dimensions.get('window').width - 50}
        height={560}
        data={[0, 1]}
        renderItem={({ item }) => {
          if (item === 0) {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginHorizontal: 24,
                }}
              >
                <AddContentCard
                  title="List an Item"
                  description="Upload an item to your profile so that others can buy it!Items can be added to videos you post and will be featured
                  alongside them."
                  buttonTitle="Start Listing"
                  nextRoute="/list-item/create-listing"
                >
                  <ProductSelectedShowcase product={test} />
                </AddContentCard>
              </View>
            );
          }
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginHorizontal: 24,
              }}
            >
              <AddContentCard
                title="Upload a Video"
                description="Create a video that showcases the items in your profile!

Videos will be shared to the marketplace for others to view."
                buttonTitle="Create a Video"
                nextRoute="/video-upload/landing-page"
              >
                <VideoPreview />
              </AddContentCard>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
});
