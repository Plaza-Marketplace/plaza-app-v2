import { getProductReviewsByProductId } from '@/services/productReview';
import { useQuery } from '@tanstack/react-query';

const useGetProductReviewsByProductId = (productId: Id) =>
  useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: () => getProductReviewsByProductId(productId),
  });

export default useGetProductReviewsByProductId;
