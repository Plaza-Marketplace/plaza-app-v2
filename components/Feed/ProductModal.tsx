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
import { Image } from 'react-native';

interface ProductModalProps {
  product: Product;
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const ProductModal: FC<ProductModalProps> = ({ product, bottomSheetRef }) => {
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
        <Rating rating={4.5} />
        <SubheaderText>${product.price.toFixed(2)}</SubheaderText>
        <UserInfo name="Seller Display Name" description="0" />
        <ExpandableDescription
          description={product.description}
          initialNumberOfLines={3}
        />
      </View>
      <SafeAreaView>
        <Footer
          leftTitle="Add to Cart"
          rightTitle="Buy Now"
          leftOnPress={() => {}}
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
