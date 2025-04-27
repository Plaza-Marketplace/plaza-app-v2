import { FC, useMemo } from 'react';
import Footer from '../Footer';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SubheaderText from '../Texts/SubheaderText';
import Spacing from '@/constants/Spacing';
import UserInfo from '../UserInfo';
import { Image } from 'expo-image';
import useCreateCartItem from '@/hooks/queries/useCreateCartItem';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import useGetSellerInfo from '@/hooks/queries/useGetSellerInfo';
import useCreateOrderHistoryItems from '@/hooks/queries/useCreateOrderHistoryItems';
import { Event, track } from '@/analytics/utils';
import HeaderText from '../Texts/HeaderText';
import { formatPrice } from '@/utils/currency';
import PressableOpacity from '../Buttons/PressableOpacity';
import { Bookmark } from '../Icons';
import BodyText from '../Texts/BodyText';
import { FlatList } from 'react-native-gesture-handler';
import { SellerReview } from '@/models/review';
import BoldSubheaderText from '../Texts/BoldSubheaderText';

const { width } = Dimensions.get('window');

interface ProductModalProps {
  sellerId: Id;
  product: Product;
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const mockData: SellerReview[] = [
  {
    id: 1,
    seller: {
      id: 1,
      username: 'John Doe',
      profileImageUrl: '',
    },
    reviewer: {
      id: 2,
      username: 'Jane Smith',
      profileImageUrl: '',
    },
    rating: 5,
    description: 'Great product, highly recommend!',
    createdAt: new Date().toDateString(),
  },
  {
    id: 2,
    seller: {
      id: 1,
      username: 'John Doe',
      profileImageUrl: '',
    },
    reviewer: {
      id: 2,
      username: 'Jane Smith',
      profileImageUrl: '',
    },
    rating: 5,
    description: 'Great product, highly recommend!',
    createdAt: new Date().toDateString(),
  },
];

const ProductModal: FC<ProductModalProps> = ({
  sellerId,
  product,
  bottomSheetRef,
}) => {
  const insets = useSafeAreaInsets();
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { mutate: createCartItem } = useCreateCartItem(product, user?.id);
  const { mutate: createOrderHistoryItem } = useCreateOrderHistoryItems(
    [product.id],
    user?.id
  );
  const { data: seller } = useGetSellerInfo(sellerId);

  const snapPoints = useMemo(() => ['90%'], []);

  const handleAddToCart = () => {
    createCartItem();
    track(Event.CLICKED_ADD_TO_CART, { productId: product.id });
  };

  const handleBuyNow = () => {
    createOrderHistoryItem();
    track(Event.CLICKED_BUY_NOW, { productId: product.id });
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}
      handleStyle={{
        width: '100%',
        position: 'absolute',
        top: 0,
      }}
      style={{ borderRadius: 15, overflow: 'hidden' }}
      enableDynamicSizing={false}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  product.imageUrls.length > 0
                    ? product.imageUrls[0]
                    : 'https://via.placeholder.com/150',
              }}
              style={styles.image}
            />
          </View>

          <View style={styles.infoContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <HeaderText>{product.name}</HeaderText>
                <SubheaderText>{formatPrice(product.price)}</SubheaderText>
              </View>

              <PressableOpacity>
                <Bookmark color="black" />
              </PressableOpacity>
            </View>

            <View style={{ marginTop: Spacing.SPACING_2 }}>
              <UserInfo name={seller?.username ?? 'Loading'} description="0" />
            </View>

            <BodyText
              variant="md"
              style={{
                marginTop: Spacing.SPACING_3,
                color: 'black',
              }}
            >
              {product.description ?? 'No description available'}
            </BodyText>

            <BoldSubheaderText style={{ marginTop: Spacing.SPACING_3 }}>
              Seller Reviews
            </BoldSubheaderText>

            <FlatList
              data={mockData}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginVertical: Spacing.SPACING_2,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    paddingBottom: Spacing.SPACING_2,
                  }}
                >
                  <UserInfo
                    name={item.reviewer.username}
                    imageUrl={item.reviewer.profileImageUrl}
                    description="0"
                  />
                  <BodyText variant="md">{item.description}</BodyText>
                </View>
              )}
            />
          </View>
        </ScrollView>
        <View style={{ paddingBottom: insets.bottom }}>
          <Footer
            leftTitle="Add to Cart"
            rightTitle="Buy Now"
            leftOnPress={handleAddToCart}
            rightOnPress={handleBuyNow}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  content: {
    gap: Spacing.SPACING_2,
  },
  image: {
    width: width,
    height: width,
    alignSelf: 'center',
  },
  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  infoContainer: {
    paddingVertical: Spacing.SPACING_2,
    paddingHorizontal: Spacing.SPACING_3,
  },
});
