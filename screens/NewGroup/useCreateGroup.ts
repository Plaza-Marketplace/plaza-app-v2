import { useMutation } from '@tanstack/react-query';
import { createGroup } from './services';
import { replaceCommunityScreen } from '@/utils/community';
import { Event, track } from '@/analytics/utils';

const useCreateGroup = () => {
  return useMutation({
    mutationKey: ['createGroup'],
    mutationFn: createGroup,
    onSuccess: (data) => {
      replaceCommunityScreen(data);
      track(Event.CREATED_GROUP, {
        groupId: data,
      });
    },
  });
};

export default useCreateGroup;
