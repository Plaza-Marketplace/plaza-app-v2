import {
  createCommunity,
  getAssociatedCommunities,
  getCommunity,
} from '@/services/crud/communities';
import { skipToken, useMutation, useQuery } from '@tanstack/react-query';

export const useGetAssociatedCommunities = (userId?: Id) =>
  useQuery({
    queryKey: ['associated-communities', userId],
    queryFn: userId ? () => getAssociatedCommunities(userId) : skipToken,
    staleTime: Infinity,
  });

export const useGetCommunityById = (communityId: Id) =>
  useQuery({
    queryKey: ['get-community', communityId],
    queryFn: () => getCommunity(communityId),
    staleTime: Infinity,
  });

export const useCreateCommunity = () =>
  useMutation({
    mutationKey: ['createCommunity'],
    mutationFn: (community: CreateCommunity) => createCommunity(community),
  });
