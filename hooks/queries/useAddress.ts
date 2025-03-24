import {
  createAddress,
  deleteAddress,
  getAddresses,
} from '@/services/crud/address';
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const useGetAddresses = (userId?: Id) => {
  return useQuery({
    queryKey: ['addresses', userId],
    queryFn: userId ? () => getAddresses(userId) : skipToken,
    staleTime: Infinity,
  });
};

const useCreateAddress = (userId?: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createAddress'],
    mutationFn: async (address: CreateAddress) => createAddress(address),
    onSuccess: async (newAddress) => {
      queryClient.setQueryData(
        ['addresses', userId],
        (oldAddresses: Address[] | undefined) => {
          return oldAddresses ? [...oldAddresses, newAddress] : [newAddress];
        }
      );
    },
  });
};

const useDeleteAddress = (userId?: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteAddress'],
    mutationFn: (addressId: Id) => deleteAddress(addressId),
    onSuccess: async (deletedAddress) => {
      queryClient.setQueryData(
        ['addresses', userId],
        (oldAddresses: Address[] | undefined) => {
          return oldAddresses
            ? oldAddresses.filter((address) => address.id !== deletedAddress.id)
            : [];
        }
      );
    },
  });
};

export { useGetAddresses, useCreateAddress, useDeleteAddress };
