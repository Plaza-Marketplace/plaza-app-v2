import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPin, getEventPage, getNextEventSellers } from './services';
import { Event } from './models';
import { useState } from 'react';

export const useGetEventPage = (id: Id) =>
  useQuery({
    queryKey: ['event', id],
    queryFn: () => getEventPage(id),
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

export const useGetNextEventSellers = (
  eventId: Id,
  sellers?: Event['sellers']
) => {
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const queryClient = useQueryClient();

  const paginate = async (sellers: Event['sellers']) => {
    if (!hasNextPage || isFetching) return;

    setIsFetching(true);
    const newSellers = await getNextEventSellers(
      eventId,
      sellers[sellers.length - 1].id
    );

    setIsFetching(false);

    if (newSellers.length === 0) {
      setHasNextPage(false);
      return;
    }

    queryClient.setQueryData<Event>(['event', eventId], (oldData) => {
      if (oldData) {
        return {
          ...oldData,
          sellers: [...oldData.sellers, ...newSellers],
        };
      }
      return oldData;
    });
  };

  return sellers ? () => paginate(sellers) : () => {};
};
