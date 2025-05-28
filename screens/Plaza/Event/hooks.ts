import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createBorderPins,
  createPin,
  getEventPage,
  getNextEventSellers,
  updateCenter,
  updateInitialHeading,
  updateInitialZoom,
} from './services';
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

export const useAddEventBorderPins = (id: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addEventBorderPins', id],
    mutationFn: (borderPins: [number, number][]) =>
      createBorderPins(id, borderPins),
    onSuccess: (_, borderPins) => {
      queryClient.setQueryData<Event>(['event', id], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            borderPins: borderPins.map((coordinates) => ({
              id: Math.random() * 1000000,
              coordinates: coordinates,
            })),
          };
        }
        return oldData;
      });
    },
  });
};

export const useUpdateInitialHeading = (id: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateInitialHeading', id],
    mutationFn: (heading: number) => updateInitialHeading(id, heading),
    onMutate: (heading) => {
      queryClient.setQueryData<Event>(['event', id], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            initialHeading: heading,
          };
        }
        return oldData;
      });
    },
  });
};

export const useUpdateInitialZoom = (id: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateInitialZoom', id],
    mutationFn: (zoom: number) => updateInitialZoom(id, zoom),
    onMutate: (zoom) => {
      queryClient.setQueryData<Event>(['event', id], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            initialZoom: zoom,
          };
        }
        return oldData;
      });
    },
  });
};

export const useUpdateCenter = (id: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateCenter', id],
    mutationFn: (coordinates: [number, number]) =>
      updateCenter(id, coordinates),
    onMutate: (coordinates) => {
      queryClient.setQueryData<Event>(['event', id], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            coordinates: coordinates,
          };
        }
        return oldData;
      });
    },
  });
};
