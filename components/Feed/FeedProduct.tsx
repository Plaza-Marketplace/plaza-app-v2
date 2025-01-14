import ProductIcon from '../Product/ProductIcon';
import { FC, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductModal from './ProductModal';

interface ProductProps {
  product: Product;
}

const FeedProduct: FC<ProductProps> = ({ product }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  console.log(product.imageUrls);
  return (
    <>
      <ProductIcon
        imageUrl={
          product.imageUrls.length > 0
            ? product.imageUrls[0]
            : 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*'
        }
        onPress={() => {
          bottomSheetRef.current?.present();
          bottomSheetRef.current?.expand();
        }}
      />
      <ProductModal bottomSheetRef={bottomSheetRef} product={product} />
    </>
  );
};

export default FeedProduct;
