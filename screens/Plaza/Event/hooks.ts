import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPin, getEvent } from './services';
import { Event } from './models';

export const useGetEvent = (id: Id) =>
  useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id),
    staleTime: 1000 * 60 * 5,
  });

export const useAddEventPin = (id: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addEventPin', id],
    mutationFn: ({
      name,
      coordinates,
    }: {
      name: string;
      coordinates: [number, number];
    }) => createPin(id, name, coordinates),
    onSuccess: (_, variables) => {
      queryClient.setQueryData<Event>(['event', id], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            pins: [
              ...(oldData.pins || []),
              {
                id: Math.random() * 1000000,
                name: variables.name,
                coordinates: variables.coordinates,
              },
            ],
          };
        }
        return oldData;
      });
    },
  });
};
