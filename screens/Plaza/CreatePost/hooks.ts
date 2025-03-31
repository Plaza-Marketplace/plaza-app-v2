import { useQuery } from '@tanstack/react-query';
import { getGroupInfo } from './services';

export const useGetGroupInfo = (groupId: Id) =>
  useQuery({
    queryKey: ['groupInfo', groupId],
    queryFn: () => getGroupInfo(groupId),
    staleTime: 1000 * 60 * 5,
  });
