import { useQuery } from '@tanstack/react-query';
import { getPostsByCommunityId } from './services';

const useGetPostsByCommunityId = (communityId: Id) =>
  useQuery({
    queryKey: ['communityPosts', communityId],
    queryFn: () => getPostsByCommunityId(communityId),
    staleTime: 1000 * 60 * 5,
  });

export default useGetPostsByCommunityId;
