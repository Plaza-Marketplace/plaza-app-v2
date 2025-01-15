import { UpdateUser, User } from "@/models/user";
import { getUser, updateUser } from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: UpdateUser) => updateUser(updates),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['user', data.authId],
        () => {
          return data
        }
      )
    }
  })
}

export const useGetUserById = (userId: number) => useQuery({
  queryKey: ['user', userId],
  queryFn: () => getUser(userId),
})