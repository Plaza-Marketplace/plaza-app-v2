import { getUserByAuthId } from '@/services/user';
import { skipToken, useQuery } from '@tanstack/react-query';

const useGetUserByAuthId = (authId?: UUID) =>
  useQuery({
    queryKey: ['user', authId],
    queryFn: authId ? () => getUserByAuthId(authId) : skipToken,
    staleTime: Infinity,
  });

export default useGetUserByAuthId;
