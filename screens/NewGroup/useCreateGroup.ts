import { useMutation } from '@tanstack/react-query';
import { createGroup } from './services';

const useCreateGroup = () =>
  useMutation({
    mutationKey: ['createGroup'],
    mutationFn: createGroup,
  });

export default useCreateGroup;
