import { supabase } from '@/utils/supabase';

export const createBlock = async (blockerId: Id, blockedId: Id) => {
  if (blockedId === blockerId) {
    throw new Error('You cannot block yourself');
  }

  await supabase.from('block').insert({
    blocked_id: blockedId,
    blocker_id: blockerId,
  });
};
