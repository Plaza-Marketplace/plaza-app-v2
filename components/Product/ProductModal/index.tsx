import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { FC, RefObject, useMemo, useState } from 'react';
import HeadingText from '@/components/Texts/HeadingText';
import ProfileIcon from '@/components/ProfileIcon';
import BodyText from '@/components/Texts/BodyText';
import { Dimensions, StyleSheet, View } from 'react-native';
import Rating from '@/components/Rating';
import Footer from '@/components/Footer';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import useGetProductModalProduct from './useGetProductModalProduct';
import { Image } from 'expo-image';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { formatPrice } from '@/utils/currency';
import ReviewCard from '@/components/ReviewCard';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

interface ProductModalProps {
  id: Id;

  bottomSheetRef: RefObject<BottomSheetModal>;
}

const CustomHandle = () => (
  <View style={{ position: 'absolute', height: 20, width: '100%' }}>
    <View
      style={{
        alignSelf: 'center',
        top: 10,
        width: 40,
        height: 5,
        backgroundColor: '#AAAAAC',
        borderRadius: 10,
      }}
    />
  </View>
);

const ProductModal: FC<ProductModalProps> = ({ id, bottomSheetRef }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useGetProductModalProduct(id, isOpen);
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ['90%'], []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}
      enableDynamicSizing={false}
      onChange={(index) => {
        if (index === -1) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      }}
      handleComponent={CustomHandle}
      backgroundStyle={{ borderRadius: Radius.LG }}
    >
      {!isLoading && data !== undefined && (
        <>
          <BottomSheetScrollView
            style={{
              flex: 1,
              overflow: 'hidden',
              borderTopLeftRadius: Radius.LG,
              borderTopRightRadius: Radius.LG,
            }}
          >
            <View style={styles.carouselContainer}>
              <Carousel
                loop={false}
                data={data?.imageUrls ?? []}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').width - 32,
                    }}
                    contentFit="contain"
                  />
                )}
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').width - 32}
              />
            </View>
            <View style={styles.container}>
              <View>
                <HeadingText variant="h5-bold">{data?.name}</HeadingText>
                <BodyText variant="lg-medium">
                  {formatPrice(data?.price ?? 0)}
                </BodyText>
              </View>
              <View style={styles.infoContainer}>
                <ProfileIcon variant="user" size={32} url={undefined} />
                <View style={styles.sellerInfo}>
                  <PressableOpacity
                    onPress={() =>
                      router.push({
                        pathname: '/profile-modal',
                        params: { id: data?.seller.id },
                      })
                    }
                  >
                    <BodyText variant="md">{data?.seller.username}</BodyText>
                  </PressableOpacity>
                  <Rating rating={data?.seller.averageRating ?? 0} />
                </View>
              </View>
              <BodyText variant="md">{data?.description}</BodyText>
              <HeadingText variant="h6-bold">
                Seller Reviews ({data?.seller.reviews.length})
              </HeadingText>
              {data?.seller.reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  username={review.poster.username}
                  profileImageUrl={review.poster.profileImageUrl}
                  rating={review.rating}
                  description={review.description}
                />
              ))}
            </View>
          </BottomSheetScrollView>
          <View style={{ paddingBottom: insets.bottom }}>
            {user?.id === data?.seller.id ? (
              <Footer leftTitle="Delete Product" rightTitle="Edit Product" />
            ) : (
              <Footer leftTitle="Add to Cart" rightTitle="Buy Now" />
            )}
          </View>
        </>
      )}
    </BottomSheetModal>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
    gap: 12,
    backgroundColor: Color.WHITE,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  carouselContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width - 32,
    backgroundColor: Color.GREY_100,
  },
  sellerInfo: {
    gap: 4,
  },
});
