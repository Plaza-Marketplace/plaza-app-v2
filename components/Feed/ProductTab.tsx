import useGetProductReviewsByProductId from '@/hooks/queries/useGetProductReviewsByProductId';
import ReviewModalTab from './ReviewModalTab';
import { FC } from 'react';

interface ProductTabProps {
  product: Product;
}

const ProductTab: FC<ProductTabProps> = ({ product }) => {
  const { data } = useGetProductReviewsByProductId(product.id);

  const reviews = data ?? [];

  return (
    <ReviewModalTab
      isSeller={false}
      reviews={reviews}
      name={product.name}
      imageUrl={product.imageUrls[0]}
    />
  );
};

export default ProductTab;
