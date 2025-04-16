import { useGetSellerReviews } from '@/hooks/queries/useSellerReview';
import ReviewModalTab from './ReviewModalTab';
import { FC } from 'react';

interface SellerTabProps {
  seller: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
}

const SellerTab: FC<SellerTabProps> = ({ seller }) => {
  const { data, error } = useGetSellerReviews(seller.id);

  console.log(data);

  const reviews = data ?? [];

  return <ReviewModalTab reviews={reviews} />;
};

export default SellerTab;
