import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createGroupPost,
  getGroupInfo,
  getProductThumbnailUrl,
} from './services';
import { useAuth } from '@/contexts/AuthContext';

export const useGetGroupInfo = (groupId: Id) =>
  useQuery({
    queryKey: ['groupInfo', groupId],
    queryFn: () => getGroupInfo(groupId),
    staleTime: 1000 * 60 * 5,
  });

export const useGetProductThumbnailUrl = (productId: Id | null) =>
  useQuery({
    queryKey: ['productThumbnailUrl', productId],
    queryFn: productId ? () => getProductThumbnailUrl(productId) : skipToken,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateGroupPost = (groupId: Id) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationKey: ['createGroupPost'],
    mutationFn: user
      ? (variables: {
          title: string;
          description: string;
          productId: Id | null;
        }) =>
          createGroupPost(
            groupId,
            user.id,
            variables.title,
            variables.description,
            variables.productId
          )
      : undefined,
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ['communityPosts', groupId] });
    },
  });
};
