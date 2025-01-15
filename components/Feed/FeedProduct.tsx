import ProductIcon from '../Product/ProductIcon';
import { FC, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductModal from './ProductModal';

interface ProductProps {
  sellerId: Id;
  product: Product;
}

const FeedProduct: FC<ProductProps> = ({ sellerId, product }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <ProductIcon
        imageUrl={
          product.imageUrls.length > 0 ? product.imageUrls[0] : undefined
        }
        onPress={() => {
          bottomSheetRef.current?.present();
        }}
      />
      <ProductModal
        bottomSheetRef={bottomSheetRef}
        sellerId={sellerId}
        product={product}
      />
    </>
  );
};

export default FeedProduct;
