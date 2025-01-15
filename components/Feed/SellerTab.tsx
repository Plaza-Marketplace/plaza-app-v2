import { useGetSellerReviews } from '@/hooks/queries/useSellerReview';
import ReviewModalTab from './ReviewModalTab';
import { FC } from 'react';

interface SellerTabProps {
  seller: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
}

const SellerTab: FC<SellerTabProps> = ({ seller }) => {
  const { data } = useGetSellerReviews(seller.id);

  const reviews = data ?? [];

  return (
    <ReviewModalTab
      isSeller
      name={seller.username}
      imageUrl={seller.profileImageUrl ?? undefined}
      reviews={reviews}
    />
  );
};

export default SellerTab;
