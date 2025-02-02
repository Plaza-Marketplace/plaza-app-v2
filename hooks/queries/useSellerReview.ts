import { getSellerReviewsBySellerId } from "@/services/crud/sellerReviews";
import { useQuery } from "@tanstack/react-query";

export const useGetSellerReviews = (sellerId: Id) => useQuery({
  queryKey: ['sellerReviews', sellerId],
  queryFn: () => getSellerReviewsBySellerId(sellerId),
  staleTime: Infinity
})