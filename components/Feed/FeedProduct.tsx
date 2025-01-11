import ProductIcon from '../Product/ProductIcon';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductModal from './ProductModal';

const FeedProduct = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <ProductIcon
        onPress={() => {
          bottomSheetRef.current?.present();
          bottomSheetRef.current?.expand();
        }}
      />
      <ProductModal bottomSheetRef={bottomSheetRef} />
    </>
  );
};

export default FeedProduct;
