import { FC, useRef } from 'react';
import PressableOpacity from './Buttons/PressableOpacity';
import { StyleSheet } from 'react-native';
import ProductShowcase from './PostCards/ProductCards/ProductShowcase';
import Spacing from '@/constants/Spacing';
import ProductModal from './Product/ProductModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface ProfileProductProps {
  product: Product;
}

const ProfileProduct: FC<ProfileProductProps> = ({ product }) => {
  const productModalRef = useRef<BottomSheetModal>(null);

  const handlePress = () => {
    productModalRef.current?.present();
  };

  return (
    <>
      <PressableOpacity style={[styles.container]} onPress={handlePress}>
        <ProductShowcase product={product} />
      </PressableOpacity>
      <ProductModal bottomSheetRef={productModalRef} id={product.id} />
    </>
  );
};

export default ProfileProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing.SPACING_2,
    padding: Spacing.SPACING_2,
  },
});
