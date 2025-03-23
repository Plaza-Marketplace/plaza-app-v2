import { FC } from 'react';
import Footer from '../Footer';
import FeedBottomSheet from './FeedBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SubheaderText from '../Texts/SubheaderText';
import Spacing from '@/constants/Spacing';
import UserInfo from '../UserInfo';
import { Image } from 'expo-image';
import useCreateCartItem from '@/hooks/queries/useCreateCartItem';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import useGetSellerInfo from '@/hooks/queries/useGetSellerInfo';
import StandardText from '../Texts/StandardText';
import useCreateOrderHistoryItems from '@/hooks/queries/useCreateOrderHistoryItems';
import { Event, track } from '@/analytics/utils';
import { useSelectedCartItems } from '@/contexts/CartSelectedProductsContext';

interface ProductModalProps {
  sellerId: Id;
  product: Product;
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const ProductModal: FC<ProductModalProps> = ({
  sellerId,
  product,
  bottomSheetRef,
}) => {
  const insets = useSafeAreaInsets();
  const { dispatchSelectedCartItems } = useSelectedCartItems();
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { mutate: createCartItem } = useCreateCartItem(product, user?.id);
  const { mutate: createOrderHistoryItem } = useCreateOrderHistoryItems(
    [product.id],
    user?.id
  );
  const { data: seller } = useGetSellerInfo(sellerId);

  const handleAddToCart = () => {
    createCartItem(undefined, {
      onSuccess: (data) => {
        dispatchSelectedCartItems({
          type: 'ADD_ITEM',
          id: product.id,
          item: data,
        });
      },
    });
    track(Event.CLICKED_ADD_TO_CART, { productId: product.id });
  };

  const handleBuyNow = () => {
    createOrderHistoryItem();
    track(Event.CLICKED_BUY_NOW, { productId: product.id });
  };

  return (
    <FeedBottomSheet bottomSheetRef={bottomSheetRef}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{
            uri:
              product.imageUrls.length > 0
                ? product.imageUrls[0]
                : 'https://via.placeholder.com/150',
          }}
          style={{ width: 200, height: 200, alignSelf: 'center' }}
        />

        <SubheaderText>{product.name}</SubheaderText>
        {/* <Rating rating={seller?.averageRating ?? 0} /> */}
        <SubheaderText>${product.price.toFixed(2)}</SubheaderText>
        <UserInfo name={seller?.username ?? 'Loading'} description="0" />
        <StandardText>{product.description}</StandardText>
      </ScrollView>
      <View style={{ paddingBottom: insets.bottom }}>
        <Footer
          leftTitle="Add to Cart"
          rightTitle="Buy Now"
          leftOnPress={handleAddToCart}
          rightOnPress={handleBuyNow}
        />
      </View>
    </FeedBottomSheet>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'green',
    paddingTop: 0,
    marginTop: 0,
  },
  content: {
    padding: Spacing.SPACING_4,
    gap: Spacing.SPACING_2,
  },
});
