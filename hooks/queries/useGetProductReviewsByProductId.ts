import { getProductReviewsByProductId } from '@/services/crud/productReview';
import { useQuery } from '@tanstack/react-query';

const useGetProductReviewsByProductId = (productId: Id) =>
  useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: () => getProductReviewsByProductId(productId),
  });

export default useGetProductReviewsByProductId;
