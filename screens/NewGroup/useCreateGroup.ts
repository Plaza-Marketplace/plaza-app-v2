import { useMutation } from '@tanstack/react-query';
import { createGroup } from './services';
import { replaceCommunityScreen } from '@/utils/community';

const useCreateGroup = () => {
  return useMutation({
    mutationKey: ['createGroup'],
    mutationFn: createGroup,
    onSuccess: (data) => replaceCommunityScreen(data),
  });
};

export default useCreateGroup;
