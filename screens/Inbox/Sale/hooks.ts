import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSaleScreen, updateTrackingNumber } from './services';
import { SaleScreen } from './models';

export const useGetSaleScreen = (saleId: Id) =>
  useQuery({
    queryKey: ['sale', saleId],
    queryFn: () => getSaleScreen(saleId),
    staleTime: 1000 * 60 * 5,
  });

export const useUpdateTrackingNumber = (saleId: Id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateTrackingNumber', saleId],
    mutationFn: (trackingNumber: string) =>
      updateTrackingNumber(saleId, trackingNumber),
    onMutate: (trackingNumber) => {
      queryClient.setQueryData<SaleScreen>(['sale', saleId], (prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          trackingNumber,
        };
      });
    },
  });
};
