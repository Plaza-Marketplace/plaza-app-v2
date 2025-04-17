import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { FC, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import HeadingText from '@/components/Texts/HeadingText';
import ProfileIcon from '@/components/ProfileIcon';
import BodyText from '@/components/Texts/BodyText';
import { Dimensions, StyleSheet, View } from 'react-native';
import Rating from '@/components/Rating';
import Footer from '@/components/Footer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import {
  useAddToCart,
  useDeleteProduct,
  useGetProductModalProduct,
} from './hooks';
import { Image } from 'expo-image';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { formatPrice } from '@/utils/currency';
import ReviewCard from '@/components/ReviewCard';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Bookmark, Check } from '@/components/Icons';
import AddToGroupModal from '@/components/Community/AddToGroupModal';
import Chip from '@/components/Chip';
import { areObjectsEqual } from '@/utils/misc';
import Spacing from '@/constants/Spacing';

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
  const { data, isLoading, error } = useGetProductModalProduct(id, isOpen);
  const { mutate: addToCart } = useAddToCart(id);
  const { mutate: deleteProduct } = useDeleteProduct(id);
  const [showConfirmAdded, setShowConfirmAdded] = useState(false);

  const [selectedVariantValues, setSelectedVariantValues] = useState<
    Record<string, string>
  >({});
  const [isOpen, setIsOpen] = useState(false);

  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ['90%'], []);
  const addToGroupRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (data?.variants) {
      const initialSelectedVariantValues: Record<string, string> = {};
      Object.entries(data.variants).forEach(([type, values]) => {
        initialSelectedVariantValues[type] = values[0];
      });

      setSelectedVariantValues(initialSelectedVariantValues);
    }
  }, [data?.variants]);

  const handleVariantSelect = (type: string, value: string) => {
    setSelectedVariantValues((prev) => ({ ...prev, [type]: value }));
    console.log('what', data?.variantInfo);
  };

  return (
    <>
      <AddToGroupModal productId={id} bottomSheetRef={addToGroupRef} />
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
                        height: Dimensions.get('window').width,
                      }}
                      contentFit="contain"
                    />
                  )}
                  width={Dimensions.get('window').width}
                  height={Dimensions.get('window').width - 32}
                />
              </View>
              <View style={styles.container}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <HeadingText variant="h5-bold">{data?.name}</HeadingText>
                    <BodyText variant="lg-medium">
                      {!data.hasVariants
                        ? formatPrice(data.price ?? NaN)
                        : formatPrice(
                            data.variantInfo.find((variant) =>
                              areObjectsEqual(
                                variant.selectedVariants,
                                selectedVariantValues
                              )
                            )?.price ?? NaN
                          )}
                    </BodyText>
                  </View>
                  <PressableOpacity
                    onPress={() => {
                      addToGroupRef.current?.present();
                      console.log('HELLO');
                    }}
                  >
                    <Bookmark color={Color.BLACK} />
                  </PressableOpacity>
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
                <View>
                  {data.hasVariants &&
                    Object.entries(data.variants).map(([type, values]) => (
                      <View key={type} style={styles.variantsContainer}>
                        <BodyText variant="lg-medium">{type}</BodyText>
                        <View style={styles.productVariants}>
                          {values.map((value) => (
                            <PressableOpacity
                              key={value}
                              onPress={() => handleVariantSelect(type, value)}
                            >
                              <Chip
                                title={value}
                                isSelected={
                                  selectedVariantValues[type] === value
                                }
                              />
                            </PressableOpacity>
                          ))}
                        </View>
                      </View>
                    ))}
                </View>
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
                <Footer
                  leftTitle="Delete Product"
                  rightTitle="Edit Product"
                  leftOnPress={deleteProduct}
                />
              ) : (
                <Footer
                  leftTitle="Add to Cart"
                  rightTitle="Buy Now"
                  leftOnPress={() => {
                    addToCart();
                    setShowConfirmAdded(true);
                    setTimeout(() => {
                      setShowConfirmAdded(false);
                    }, 2000);
                  }}
                />
              )}
            </View>

            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                display: showConfirmAdded ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={[
                  styles.checkContainer,
                  { marginBottom: Spacing.SPACING_4 },
                ]}
              >
                <Check width={45} height={45} color={Color.WHITE} />
              </View>
              <HeadingText variant="h5-bold">Added to cart!</HeadingText>
            </View>
          </>
        )}
      </BottomSheetModal>
    </>
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
  variantsContainer: {
    gap: 4,
  },
  productVariants: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
  },
  checkContainer: {
    padding: 10,
    backgroundColor: Color.SUCCESS_DEFAULT,
    borderRadius: 9999,
  },
});
