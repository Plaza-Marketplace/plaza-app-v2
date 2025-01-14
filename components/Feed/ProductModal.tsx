import { FC } from 'react';
import Footer from '../Footer';
import FeedBottomSheet from './FeedBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubheaderText from '../Texts/SubheaderText';
import Rating from '../Rating';
import Spacing from '@/constants/Spacing';
import UserInfo from '../UserInfo';
import ExpandableDescription from '../ExpandableDescription';
import { Image } from 'expo-image';
import useCreateCartItem from '@/hooks/queries/useCreateCartItem';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import useGetSellerInfo from '@/hooks/queries/useGetSellerInfo';

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
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { mutate: createCartItem } = useCreateCartItem(product, user?.id);
  const { data: seller } = useGetSellerInfo(sellerId);

  return (
    <FeedBottomSheet bottomSheetRef={bottomSheetRef}>
      <View style={styles.content}>
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
        <Rating rating={seller?.averageRating ?? 0} />
        <SubheaderText>${product.price.toFixed(2)}</SubheaderText>
        <UserInfo name={seller?.username ?? 'Loading'} description="0" />
        <ExpandableDescription
          description={product.description}
          initialNumberOfLines={3}
        />
      </View>
      <SafeAreaView>
        <Footer
          leftTitle="Add to Cart"
          rightTitle="Buy Now"
          leftOnPress={createCartItem}
          rightOnPress={() => {}}
        />
      </SafeAreaView>
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
    flex: 1,
    justifyContent: 'flex-start',
    padding: Spacing.SPACING_4,
    gap: Spacing.SPACING_2,
  },
});
