import { useQuery } from '@tanstack/react-query';
import { getCollectionProducts } from './services';

const useGetCollectionProducts = (communityId: Id) =>
  useQuery({
    queryKey: ['collectionProducts', communityId],
    queryFn: () => getCollectionProducts(communityId),
    staleTime: 1000 * 60 * 5,
  });

export default useGetCollectionProducts;
