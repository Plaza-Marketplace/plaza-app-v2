import { useMutation, useQuery } from '@tanstack/react-query';
import { getEventPin } from './services';
import { createPin } from '../services';

export const useGetEventPin = (id: Id, enabled: boolean) =>
  useQuery({
    queryKey: ['eventPin', id],
    queryFn: () => getEventPin(id),
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
  });
