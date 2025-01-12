import { createCommunity } from "@/services/communities"
import { useMutation } from "@tanstack/react-query"

const useCreateCommunity = () => useMutation({
  mutationKey: ['createCommunity'],
  mutationFn: (community: CreateCommunity) => createCommunity(community),
})

export default useCreateCommunity