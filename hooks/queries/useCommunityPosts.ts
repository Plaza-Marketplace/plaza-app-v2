import community_collections from '@/app/(app)/(tabs)/(mingle)/community/community_collections';
import { CommunityPost, CreateCommunityPost } from '@/models/communityPost';
import {
  createCommunityPost,
  deleteCommunityPost,
  getChatterPosts,
  getCommunityPost,
  getCommunityPostsByCommunity,
} from '@/services/communityPosts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetChatterPosts = () =>
  useQuery({
    queryKey: ['chatter'],
    queryFn: getChatterPosts,
  });

export const useGetCommunityPost = (postId: Id) =>
  useQuery({
    queryKey: ['community-post', postId],
    queryFn: () => getCommunityPost(postId),
    staleTime: Infinity,
  });

export const useGetCommunityPosts = (communityId: Id) =>
  useQuery({
    queryKey: ['community-posts', communityId],
    queryFn: () => getCommunityPostsByCommunity(communityId),
    staleTime: Infinity,
  });

export const useCreateCommunityPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createCommunityPost'],
    mutationFn: (post: CreateCommunityPost) => createCommunityPost(post),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['community-posts', data.communityId],
        (oldData: CommunityPost[] | undefined) => {
          return oldData ? [data, ...oldData] : [data];
        }
      );
    },
  });
};

export const useDeleteCommunityPost = () =>
  useMutation({
    mutationKey: ['deleteCommunityPost'],
    mutationFn: (postId: Id) => deleteCommunityPost(postId),
  });
