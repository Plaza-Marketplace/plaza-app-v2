import { useAuth } from '@/contexts/AuthContext';
import { UpdateUser, User } from '@/models/user';
import { getUser, updateUser } from '@/services/crud/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (updates: UpdateUser) =>
      updateUser({
        ...updates,
        id: user?.id,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user', data.authId], () => {
        return data;
      });
    },
  });
};

export const useGetUserById = (userId: number) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  });
