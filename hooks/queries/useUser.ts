import { UpdateUser, User } from "@/models/user";
import { updateUser } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: UpdateUser) => updateUser(updates),
    onSuccess: (data) => {
      console.log(data)
      queryClient.setQueryData(
        ['user', data.authId],
        (oldData: User | undefined) => {
          return data
        }
      )
    }
  })
}