import { getCommunityCollectionItemsByCommunityId } from '@/services/crud/communityCollectionItem';
import { useQuery } from '@tanstack/react-query';

const useGetCommuntyCollectionItems = (communityId: Id) =>
  useQuery({
    queryKey: ['community-collection-items', communityId],
    queryFn: () => getCommunityCollectionItemsByCommunityId(communityId),
  });

export default useGetCommuntyCollectionItems;
